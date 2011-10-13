class StoresController < ApplicationController
  before_filter :authenticate_user!, :except => [:near, :preview]

  before_filter :load_store, :except => [:index, :near, :new, :create]

  def preview
    render :layout => false
  end

  def index
    @stores = Store.all
  end

  def show
  end

  def new
    @store = Store.new
  end

  def edit
  end

  def create
    @store = Store.new(params[:store])
    respond_to do |format|
      if @store.save
        format.html { redirect_to(@store, :notice => 'Store was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    respond_to do |format|
      if @store.update_attributes(params[:store])
        format.html { redirect_to(@store, :notice => 'Store was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @store.destroy
    redirect_to stores_url
  end

  private

  def load_store
    @store = Store.find(params[:id])
  end

end
