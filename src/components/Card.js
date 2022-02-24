import React, { useEffect, useState, useRef, useContext } from "react";
import ChipLogo from "./../images/chip.png";
import Visa from "./../images/visa.png";
import MasterCard from "./../images/masterCard.png";
import { DataContext } from "../context/Context";

const cardBrand = {
  visa: {
    background: "linear-gradient(to right , #ad5389,#3c1053)",
    logo: Visa,
  },
  masterCard: {
    background: "linear-gradient(to right , #fc4a1a,#f7b733)",
    logo: MasterCard,
  },
  default: {
    background: "linear-gradient(to right , #0f2027 ,#203a43,#2c5364)",
    logo: "",
  },
};

const Card = () => {
  const numberInput = useRef(null);
  const monthInput = useRef(null);
  const yearInput = useRef(null);
  const cvvInput = useRef(null);
  const [rotateCard, setRotateCard] = useState(true);
  const [cardTheme, setCardTheme] = useState(cardBrand.visa);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });
  const { fetchData, setCardDetails } = useContext(DataContext);

  const formatNumber = (e) => {
    if (e.target.value.length < 19) {
      e.target.value = e.target.value
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ");

      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (
      cardInfo.cardNumber.length +
        cardInfo.cvv.length +
        cardInfo.month.length +
        cardInfo.year.length ===
      28
    ) {
      setCardDetails(cardInfo);
      fetchData();
    }
  }, [cardInfo]);

  useEffect(() => {
    if (
      (cardInfo.cardNumber !== "" && cardInfo.cardNumber === "1") ||
      cardInfo.cardNumber === "2" ||
      cardInfo.cardNumber === "3" ||
      cardInfo.cardNumber === "6" ||
      cardInfo.cardNumber === "7" ||
      cardInfo.cardNumber === "8" ||
      cardInfo.cardNumber === "9" ||
      cardInfo.cardNumber === "0"
    ) {
      alert("Card number must start with 4 or 5");
      setCardInfo({
        cardNumber: "",
        month: cardInfo.month,
        year: cardInfo.year,
        cvv: cardInfo.cvv,
      });
    }
    if (cardInfo.cardNumber[0] === "4") {
      setCardTheme(cardBrand.visa);
    } else if (cardInfo.cardNumber[0] === "5") {
      setCardTheme(cardBrand.masterCard);
    } else setCardTheme(cardBrand.default);
  }, [cardInfo.cardNumber]);

  useEffect(() => {
    numberInput.current.focus();
    if (cardInfo.cardNumber.length == 19) {
      setRotateCard(false);
      monthInput.current.focus();
    }
    if (cardInfo.month.length == 2) {
      yearInput.current.focus();
    }
    if (cardInfo.year.length == 4) {
      cvvInput.current.focus();
    }
  }, [cardInfo]);

  return (
    <div className="card">
      <div class="container">
        <div className="card-container">
          <div
            className={rotateCard ? "front" : "front rotateFront"}
            style={{
              background: cardTheme.background,
            }}
          >
            <div className="image">
              <img className="chipStyle" src={ChipLogo} alt="" />
              <img src={cardTheme.logo} alt="" />
            </div>
            <div className="card-number-box">
              <input
                ref={numberInput}
                value={cardInfo.cardNumber}
                maxLength="19"
                onChange={(e) =>
                  setCardInfo({
                    cardNumber: e.target.value.replace(/[^0-9" "]/g, ""),
                    month: cardInfo.month,
                    year: cardInfo.year,
                    cvv: cardInfo.cvv,
                  })
                }
                onKeyPress={(e) => formatNumber(e)}
                placeholder="0000  0000  0000  0000"
              />
            </div>
            <div className="flexbox">
              <div className="box">
                <div className="card-holder-name">SINAN BULUT</div>
              </div>
            </div>
          </div>

          <div
            className={rotateCard ? "back" : "back rotateBack"}
            style={{
              background: cardTheme.background,
            }}
          >
            <div className="stripe"></div>
            <div className="box">
              <div className="cvv-box">
                <input
                  ref={cvvInput}
                  className="cvvInput"
                  value={cardInfo.cvv}
                  maxLength="3"
                  onChange={(e) =>
                    setCardInfo({
                      cardNumber: cardInfo.cardNumber,
                      month: cardInfo.month,
                      year: cardInfo.year,
                      cvv: e.target.value.replace(/[^0-9" "]/g, ""),
                    })
                  }
                  onKeyPress={(e) => formatNumber(e)}
                  placeholder="CVV"
                />
              </div>
              <img src={cardTheme.logo} alt="" />
            </div>
            <div className="boxBottom">
              <div className="left">
                <span>VALID</span>
                <span>THRU</span>
              </div>

              <div className="rigth">
                <input
                  ref={monthInput}
                  className="thru-input"
                  value={cardInfo.month}
                  maxLength="2"
                  onChange={(e) =>
                    setCardInfo({
                      cardNumber: cardInfo.cardNumber,
                      month: e.target.value.replace(/[^0-9" "]/g, ""),
                      year: cardInfo.year,
                      cvv: cardInfo.cvv,
                    })
                  }
                  onKeyPress={(e) => formatNumber(e)}
                  placeholder="mm"
                />
                <span>/</span>
                <input
                  ref={yearInput}
                  className="thru-input-year"
                  value={cardInfo.year}
                  maxLength="4"
                  onChange={(e) =>
                    setCardInfo({
                      cardNumber: cardInfo.cardNumber,
                      month: cardInfo.month,
                      year: e.target.value.replace(/[^0-9" "]/g, ""),
                      cvv: cardInfo.cvv,
                    })
                  }
                  onKeyPress={(e) => formatNumber(e)}
                  placeholder="yy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="cardRotateButton"
        onClick={() => setRotateCard(!rotateCard)}
      >
        <svg
          className={rotateCard ? "buttonSvg" : "buttonSvg rotateButton"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
        </svg>
      </button>
    </div>
  );
};

export default Card;
