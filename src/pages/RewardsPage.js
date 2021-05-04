import React, { useEffect, useState } from "react";
import SimpleBar from 'simplebar-react'
import { RiLock2Fill } from 'react-icons/ri'
import { GiOpenChest } from 'react-icons/gi';
import './RewardsPage.scss'
import 'simplebar/dist/simplebar.min.css'

export default function RewardsPage() {
    return(
        <div className="App">
            <div id="Rewards-Page-Container" className="container">
                <div className="container">
                    <div className="row justify-content-center mt-3">
                        <h1 id="Rewards-Title">Rewards</h1>
                    </div>
                </div>
                <div id="Rewards-Content-Container" className="container-fluid mb-3">
                    <SimpleBar style={{ height: '60vh' }} autoHide={false}>
                        <div className="d-flex">
                            <div className="d-flex">
                                <GiOpenChest size={80}/>reward 1
                            </div>
                            <div className="d-flex">
                                reward 2
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </div>
    )
}