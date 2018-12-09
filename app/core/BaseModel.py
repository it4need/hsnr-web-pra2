# coding: utf-8
import codecs
import json
import os
import os.path

from app.config.app import AppConfig


class BaseModel:
    ID_INDEX = 0

    def __init__(self, fileName, data_attributes):
        if 'id' in data_attributes:
            raise Exception("ID is not allowed in data_attributes")

        data_attributes.insert(self.ID_INDEX, 'id')
        self.data = None
        self.withTransformData = True
        self.file_name = fileName
        self.data_attributes = data_attributes
        self.__createDatabaseFolderIfNotExist()
        self.__read()

    def create(self, values):
        new_values = []

        if 'id' in values:
            raise Exception("The ID increments automatically. Do not pass it as a value.")

        for attribute in self.data_attributes:
            if attribute in values:
                new_values.append(values[attribute])
            else:
                new_values.append(None)

        new_values[self.ID_INDEX] = self.__getMaxId() + 1
        self.data['data'].append(list(new_values))

        if self.__save():
            return self.find(self.__getMaxId())
        else:
            return False

    def find(self, findId):
        for data in self.data['data']:
            if data[self.ID_INDEX] == int(findId):
                data = dict(zip(self.data_attributes, data))
                dataList = list()
                dataList.append(data)

                if hasattr(self.__class__, '_transformData') and callable(getattr(self.__class__, '_transformData')) \
                        and self.withTransformData:
                    return self._transformData(dataList)
                else:
                    return dataList

        return False

    def findOrFail(self, findId):
        entry = self.find(findId)

        if entry is False:
            raise Exception("The entry with ID " + str(findId) + " was not found on model: " + str(self.__class__))

        return entry

    def all(self, where=None):
        all_data = list()

        for data in self.data['data']:
            all_data.append(dict(zip(self.data_attributes, data)))

        if where is not None:
            reducedSet = list()

            for data in all_data:
                count = len(where)

                for condition_key, condition in where.items():
                    if data[condition_key] == condition:
                        count = count - 1
                    else:
                        break

                if count == 0:
                    reducedSet.append(data)

            all_data = reducedSet

        if hasattr(self.__class__, '_transformData') and callable(getattr(self.__class__, '_transformData')) \
                and self.withTransformData:
            return self._transformData(all_data)
        else:
            return all_data

    def update(self, data_id, values):
        if 'id' in values:
            raise Exception("The ID increments automatically. Do not pass it as a value.")

        for key, data in enumerate(self.data['data']):
            if int(data_id) == data[self.ID_INDEX]:
                for attr_position, attribute in enumerate(self.data_attributes):
                    if attribute in values:
                        self.data['data'][key][attr_position] = values[attribute]

                self.__save(self.__getMaxId())
                return self.find(data_id)

        return False

    def delete(self, data_id):
        for key, data in enumerate(self.data['data']):
            if int(data_id) == data[self.ID_INDEX]:
                del self.data['data'][key]
                self.__save(self.__getMaxId())
                return True

        return False

    def withoutTransform(self):
        self.withTransformData = False

        return self

    def __read(self):
        try:
            if AppConfig.mode == 'testing':
                openedFile = codecs.open(
                    os.path.join(AppConfig.database_folder_test, self.file_name + AppConfig.database_extension), 'r',
                    'utf-8')
            else:
                openedFile = codecs.open(
                    os.path.join(AppConfig.database_folder, self.file_name + AppConfig.database_extension), 'r',
                    'utf-8')
        except:
            self.data = self.__newJSONStructure()
            self.__save(0)
        else:
            with openedFile:
                self.data = json.load(openedFile)

    def __save(self, maxId=None):
        if AppConfig.mode == 'testing':
            openedFile = codecs.open(
                os.path.join(AppConfig.database_folder_test, self.file_name + AppConfig.database_extension),
                'w', 'utf-8')
        else:
            openedFile = codecs.open(
                os.path.join(AppConfig.database_folder, self.file_name + AppConfig.database_extension),
                'w', 'utf-8')

        with openedFile:
            self.__setMaxId(maxId)
            json.dump(self.data, openedFile, indent=3)
            return True

        return False

    def __getMaxId(self):
        return self.data['meta']['maxId']

    def __setMaxId(self, maxId=None):
        if maxId is None:
            self.data['meta']['maxId'] = self.__getMaxId() + 1
        else:
            self.data['meta']['maxId'] = maxId

    def __newJSONStructure(self):
        return {
            "meta": {
                "maxId": 0,
                "columns": [
                    self.data_attributes
                ]
            },
            "data": []
        }

    def __createDatabaseFolderIfNotExist(self):
        if AppConfig.mode == 'testing' and not os.path.exists(AppConfig.database_folder_test):
            os.makedirs(AppConfig.database_folder_test)
        elif not os.path.exists(AppConfig.database_folder):
            os.makedirs(AppConfig.database_folder)
