from setuptools import setup

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

AUTHOR = "PUNDARIKAKSH NARAYAN TRIPATHI"
SRC_REPO = "src"
REQUIREMENTS = ["streamlit"]

setup(
    name="SRC_REPO",
    version="0.0.1",
    author=AUTHOR,
    description="A simple package for movie recommendation",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=[SRC_REPO],
    python_requires=">=3.6",
    install_requires=REQUIREMENTS,
)