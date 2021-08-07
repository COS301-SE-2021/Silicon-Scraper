from setuptools import setup 

setup(
    name = 'api',
    package = ['api'],
    include_package_data = True,
    install_requires = [
        'flask',
    ],
)