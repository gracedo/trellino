class ChangeListRankType < ActiveRecord::Migration
  def change
    change_column :lists, :rank, :float, null: false
  end
end
