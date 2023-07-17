import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

function Success() {
    const style = {
        imageStyle: {height: "45px"},
        fixedTop: {padding: '10px 25px', backgroundColor: "white", display: "flex", justifyContent: "center"},
        fixedHrTop: {
            width: "99%",
            height: "1px",
            backgroundColor: "rgb(254, 52, 110)",
            marginTop: "0!important",
            marginBottom: "0!important"
        },
        container: {maxWidth: '80%', margin: 'auto'},
        prtBanner: {background: "#FE346E", padding: '20px 0px', color: '#fff'},
        prtBannerTitle: {fontSize: '16px', fontWeight: '700', margin: '0 0 10px'},
        prtBannerStrong: {fontSize: '9px', margin: '0 0  1px', fontWeight: '500'},
        prtBannerText: {fontSize: '9px', marginBottom: '1px', color: 'rgba(255, 255, 255, .8)'},
        rightContent: {border: '1px solid #f2f2f2', maxHeight: '80vh', overflowY: 'scroll', padding: '15px 0'}
    }
    return (
        <>
            <div style={style.container}>
                <img src='/logo.jpeg' className="mb-3" style={style.imageStyle}/>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-deck text-center p-5 bg-success text-light">
                       <p> Congratulation !</p>
                        <span>Payment has been made successfully</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Success