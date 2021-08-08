from setuptools import setup, find_packages 

setup(
    name = 'api',
    VERSION=1.0
    package = find_packages(),
    include_package_data = True,
    install_requires = [
        'flask',
    ],
)