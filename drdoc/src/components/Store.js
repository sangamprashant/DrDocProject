import React from "react";
import "./css/Store.css";

export default function Store() {
  return (
    <div style={{ marginTop: "-20px" }}>
      <section class="section menu" id="menu">
        <div class="menu-container ">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input
              className="store-search-box"
              type="text"
              placeholder="search your medicine"
            />

            <button>cart</button>
            <button>My order</button>
            <button>hi</button>
            <select
    // value={account}
    //onChange={(e) => {
    //  setAccount(e.target.value);
    //}}
  >

    <option value="regular">All Items</option>
    <option value="regular">Capsules</option>
    <option value="seller">Liquid</option>
    <option value="doctor">Drops</option>
    <option value="seller">Inhalers</option>
    <option value="seller">Injections</option>
  </select>
          </div>
          <br />
          <div style={{display:"flex",justifyContent:"center"}}>
          <div class="row justify-content-center mb-3" style={{ width: "90%" }}>
            <div class="col-md-12">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row g-0">
                    <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                          class="w-100"
                        />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div
                              class="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-xl-6 col-md-5 col-sm-7">
                      <h5>Rucksack Backpack Jeans</h5>
                      <div class="d-flex flex-row">
                        <div class="text-warning mb-1 me-2">
                          
                          <span class="ms-1">Product Tagline goes here </span>
                        </div>
                     
                      </div>

                      <p class="text mb-4 mb-md-0">
                        Short description about the product goes here, for ex
                        its features. Lorem ipsum dolor sit amet with hapti you
                        enter into any new area of science, you almost lorem
                        ipsum is great text consectetur adipisicing
                      </p>
                      <div class="d-flex flex-row">
                        <div class="text-warning mb-1 me-2">
                          
                          <span class="ms-1">Product Type</span>
                        </div>
                     
                      </div>
                    </div>
                   
                    <div class="col-xl-3 col-md-3 col-sm-5">
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">$34,50</h4>
                        <span class="text-danger">
                          <s>$49.99</s>
                        </span>
                      </div>
                      <h6 class="text-success">Free shipping</h6>
                      <div class="mt-4">
                        <button class="btn btn-primary shadow-0" type="button">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div>
          <div class="row justify-content-center mb-3">
            <div class="col-md-12">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row g-0">
                    <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                          class="w-100"
                        />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div
                              class="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-xl-6 col-md-5 col-sm-7">
                      <h5>Rucksack Backpack Jeans</h5>
                      <div class="d-flex flex-row">
                        <div class="text-warning mb-1 me-2">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                          <span class="ms-1">4.5</span>
                        </div>
                        <span class="text-muted">154 orders</span>
                      </div>

                      <p class="text mb-4 mb-md-0">
                        Short description about the product goes here, for ex
                        its features. Lorem ipsum dolor sit amet with hapti you
                        enter into any new area of science, you almost lorem
                        ipsum is great text consectetur adipisicing
                      </p>
                    </div>
                    <div class="col-xl-3 col-md-3 col-sm-5">
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">$34,50</h4>
                        <span class="text-danger">
                          <s>$49.99</s>
                        </span>
                      </div>
                      <h6 class="text-success">Free shipping</h6>
                      <div class="mt-4">
                        <button class="btn btn-primary shadow-0" type="button">
                          Buy this
                        </button>
                        <a
                          href="#!"
                          class="btn btn-light border px-2 pt-2 icon-hover"
                        >
                          <i class="fas fa-heart fa-lg px-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mb-3">
            <div class="col-md-12">
              <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                  <div class="row g-0">
                    <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                      <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                          class="w-100"
                        />
                        <a href="#!">
                          <div class="hover-overlay">
                            <div
                              class="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-xl-6 col-md-5 col-sm-7">
                      <h5>Rucksack Backpack Jeans</h5>
                      <div class="d-flex flex-row">
                        <div class="text-warning mb-1 me-2">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                          <span class="ms-1">4.5</span>
                        </div>
                        <span class="text-muted">154 orders</span>
                      </div>

                      <p class="text mb-4 mb-md-0">
                        Short description about the product goes here, for ex
                        its features. Lorem ipsum dolor sit amet with hapti you
                        enter into any new area of science, you almost lorem
                        ipsum is great text consectetur adipisicing
                      </p>
                    </div>
                    <div class="col-xl-3 col-md-3 col-sm-5">
                      <div class="d-flex flex-row align-items-center mb-1">
                        <h4 class="mb-1 me-1">$34,50</h4>
                        <span class="text-danger">
                          <s>$49.99</s>
                        </span>
                      </div>
                      <h6 class="text-success">Free shipping</h6>
                      <div class="mt-4">
                        <button class="btn btn-primary shadow-0" type="button">
                          Buy this
                        </button>
                        <a
                          href="#!"
                          class="btn btn-light border px-2 pt-2 icon-hover"
                        >
                          <i class="fas fa-heart fa-lg px-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
