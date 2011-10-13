class AddPhoneToStores < ActiveRecord::Migration
  def self.up
    add_column :stores, :phone, :string
  end

  def self.down
    remove_column :stores, :phone
  end
end
