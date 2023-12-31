"""empty message

Revision ID: 93671431113a
Revises: 37db8645926f
Create Date: 2023-11-18 00:46:47.602144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93671431113a'
down_revision = '37db8645926f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('wishlist_places', sa.ARRAY(sa.String()), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('wishlist_places')

    # ### end Alembic commands ###
