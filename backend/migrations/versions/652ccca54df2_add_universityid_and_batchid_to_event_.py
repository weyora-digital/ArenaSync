"""Add UniversityID and BatchID to event_registration

Revision ID: 652ccca54df2
Revises: 2d8467e1b8cf
Create Date: 2024-11-02 09:05:46.507060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '652ccca54df2'
down_revision = '2d8467e1b8cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_registration', schema=None) as batch_op:
        batch_op.add_column(sa.Column('UniversityID', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('BatchID', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_registration', schema=None) as batch_op:
        batch_op.drop_column('BatchID')
        batch_op.drop_column('UniversityID')

    # ### end Alembic commands ###
