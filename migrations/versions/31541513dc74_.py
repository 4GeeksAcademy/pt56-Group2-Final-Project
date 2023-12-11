"""empty message

Revision ID: 31541513dc74
Revises: f219bb6952cb
Create Date: 2023-12-11 11:58:08.050859

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31541513dc74'
down_revision = 'f219bb6952cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('reset_token', sa.String(length=200), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('reset_token')

    # ### end Alembic commands ###
