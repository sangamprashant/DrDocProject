import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "./css/AddMedicine.css";
import Uploading from "./UploadingEffect";
import $ from "jquery";

export default function AddMedicine() {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [imageUrl, setImageUrl] = useState("");
  const [uploadload, setUploadLoad] = useState(false);

  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [salesprice, setSalesPrice] = useState("");
  const [stock, setStock] = useState("");
  const [tagline, setTagline] = useState("");
  const navigate = useNavigate();
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  // posting image to cloudinary
  const postDetails = () => {
    setUploadLoad(true); 
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drdocstartuppreset")
    data.append("cloud_name", "drdocsocial")
    fetch("https://api.cloudinary.com/v1_1/drdocsocial/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  useEffect(() => {
    // saving post to mongodb
    if (url) {
      fetch("http://localhost:5000/api/setting/product/upload", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
            imageUrl: url,
          title,
          description,
          type: type,
          mrp,
          salesPrice:salesprice,
          stock,
          tagline,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setUploadLoad(false);
            notifyA(data.error);
          } else {
            notifyB(data.message);
            setUploadLoad(false);
            navigate(`/${loggedUser.userName}/myproducts`);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  useEffect(() => {
    $(".files").attr("data-before", "Drag file here or click the above button");
    $('input[type="file"]').change(function (e) {
      var fileName = e.target.files[0].name;
      $(".files").attr("data-before", fileName);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        setImage(e.target.files[0]);
      };
      reader.readAsDataURL(e.target.files[0]);
    });
  }, []);

  return (
    <div style={{ marginTop: "-40px" }}>
      {uploadload ? (
        <div style={{ marginTop: "200px" }}>
          <Uploading />
        </div>
      ) : (
        <div className="card-0 justify-content-center ">
          <div className="card-body px-sm-4 px-0">
            <div className="row justify-content-center mb-5"></div>

            <div className="row justify-content-center round">
              <div className="col-lg-10 col-md-12 ">
                <div className="card shadow-lg card-1">
                  <div className="card-body inner-card">
                    <div className="row justify-content-center">
                      <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type Items' Title"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Marked Price</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={mrp}
                            onChange={(e) => {
                              setMrp(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Project Type</label>
                          <select
                            className="form-control"
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <option value={null}>Select an option</option>
                            <option value="Capsules">Capsules</option>
                            <option value="Liquid">Liquid</option>
                            <option value="Drops">Drops</option>
                            <option value="Inhalers">Inhalers</option>
                            <option value="Injections">Injections</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Tag Line</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={tagline}
                            onChange={(e) => {
                              setTagline(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Sales Price</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={salesprice}
                            onChange={(e) => {
                              setSalesPrice(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Stock Available</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={stock}
                            onChange={(e) => {
                              setStock(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-10 col-12">
                        <div className="form-group files">
                          <label className="my-auto">Upload Your File </label>
                          <input
                            id="file"
                            type="file"
                            className="form-control"
                          />
                        </div>
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="uploaded file"
                            style={{ maxWidth: "100%" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-10 col-12">
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            className="form-control rounded-0"
                            placeholder="Write a description for your product "
                            rows="5"
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <div className="row justify-content-end mb-5">
                          <div className="col-lg-4 col-auto ">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                            >
                              <small
                                className="font-weight-bold"
                                onClick={() => {
                                  postDetails();
                                }}
                              >
                                Upload Product
                              </small>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
