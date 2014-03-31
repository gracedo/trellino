class ChangeCardRankType < ActiveRecord::Migration
  def change
    change_column :cards, :rank, :float, null: false
  end
end
