# -*- coding: utf-8 -*-

import click

from db_tables import Base


@click.group()
def cli():
    pass

@cli.command('create_db')
def create_db():
    """
    * Create the database

    Returns
    -------
    None
    """
    Base.metadata.create_all()

if __name__ == '__main__':
    cli()
