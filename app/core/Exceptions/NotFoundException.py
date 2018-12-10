class NotFoundException(Exception):
    def __init__(self, message = 'The requested ressource was not found.'):

        # Call the base class constructor with the parameters it needs
        super().__init__(message)