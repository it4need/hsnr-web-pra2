# coding: utf-8
import os


class AppConfig:
    root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    template_folder = os.path.join(root_dir, "templates")
    view_folder = ''
    database_folder = os.path.join(root_dir, "data")
    database_extension = '.json'
    database_folder_test = os.path.join(root_dir, "data_test")
    mode = 'development'