import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
   constructor(props) {
      super(props);
      this.state = {
         product: null,
      };
   }
   openModal = (product) => {
      this.setState({ product });
   };
   closeModal = () => {
      this.setState({ product: null });
   };
   render() {
      const { product } = this.state;
      return (
         <div>
            <Fade bottom cascade>
               <ul className="products">
                  {this.props.products.map((product) => {
                     return (
                        <li key={product._id}>
                           <div className="product">
                              <a
                                 href={`#${product._id}`}
                                 onClick={() => this.openModal(product)}
                              >
                                 <img src={product.image} alt={product.title} />
                                 <p>{product.title}</p>
                              </a>
                              <div className="product_price">
                                 <div>{formatCurrency(product.price)}</div>
                                 <button
                                    className="button primary"
                                    onClick={() =>
                                       this.props.addToCart(product)
                                    }
                                 >
                                    Add To Cart
                                 </button>
                              </div>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </Fade>
            {product && (
               <Modal isOpen={true} onRequestClose={this.closeModal}>
                  <Zoom>
                     <button onClick={this.closeModal} className="close_modal">
                        x
                     </button>
                     <div className="product_details">
                        <img src={product.image} alt={product.title} />
                        <div className="product_details_description">
                           <p>
                              <strong>{product.title}</strong>
                           </p>
                           <p>{product.description}</p>
                           <p>
                              available Sizes:{" "}
                              {product.availableSizes.map((size) => (
                                 <span>
                                    {" "}
                                    <button className="button">{size}</button>
                                 </span>
                              ))}
                           </p>
                           <div className="product_price">
                              <div>{formatCurrency(product.price)}</div>
                              <button
                                 className="button primary"
                                 onClick={() => {
                                    this.props.addToCart(product);
                                    this.closeModal();
                                 }}
                              >
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </div>
                  </Zoom>
               </Modal>
            )}
         </div>
      );
   }
}
