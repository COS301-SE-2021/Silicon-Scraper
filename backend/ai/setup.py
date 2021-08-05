from setuptools import setup 

setup(
    name = 'ai',
    package = ['ai'],
    include_package_data = True,
    install_requires = [
        'flask',
    ],
)