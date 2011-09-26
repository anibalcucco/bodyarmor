class StoresController < ApplicationController
  before_filter :load_location, :only => :search
  before_filter :load_store, :except => [:index, :search, :new, :create]

  def search
    @stores = Store.within(params[:within] || 100, :origin => @location.address)

    respond_to do |format|
      format.html {}
      format.json { render :json => { :stores => @stores,
                                      :latitude => @location.latitude,
                                      :longitude => @location.longitude,
                                      :address => @location.address } }
    end
  end

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

  def load_location
    if params[:address]
      @location = Geocoder.search(params[:address]).first
    else
      @location = request.location
    end
  end

  def load_store
    @store = Store.find(params[:id])
  end

end
