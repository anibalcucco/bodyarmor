class CreateStores < ActiveRecord::Migration
	def self.up
		create_table :stores do |t|
			t.column :name, :string
			t.column :address, :string
			t.column :longitude, :float
			t.column :latitude, :float
		end
	end

  def self.down
    drop_table :stores
  end
end
