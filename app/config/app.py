# coding: utf-8
import os


class AppConfig:
    root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    view_folder = os.path.join(root_dir, "views")
    view_extension = '.html'
    database_folder = os.path.join(root_dir, "data")
    database_extension = '.json'
    mode = 'development'