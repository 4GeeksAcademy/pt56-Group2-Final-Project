"""empty message

Revision ID: 1edc5a71a80b
Revises: f800d6f10ccd
Create Date: 2023-11-28 00:30:02.249006

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1edc5a71a80b'
down_revision = 'f800d6f10ccd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_column('media_urls')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('media_urls', postgresql.ARRAY(sa.VARCHAR()), autoincrement=False, nullable=True))

    # ### end Alembic commands ###