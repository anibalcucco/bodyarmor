module MapHelper

  def postal_code
    @location.postal_code.present? ? @location.postal_code : 90210
  end

  def within_options
    [
      ["1 Mile", "1"], ["5 Miles", "5"], ["10 Miles", "10"],
      ["25 Miles", "25"], ["50 Miles", "50"], ["100 Miles", "100"]
    ]
  end

end