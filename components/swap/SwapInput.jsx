// Files and modules

import EthereumContext, { BN } from "../../state/EthereumContext.js"
import { unparse, format } from "../../helpers/number.js"
import { useEffect, useContext, useRef } from "react"

// Swap input component

const SwapInput = () => {
    // Swap data

    const { chain } = useContext(EthereumContext)
    const inputBefore = useRef("")
    const chainBefore = useRef(chain)

    // Format swap input on change

    function handleChange(event) {
        // Update token input state

        const value = !event.target.value || /^[0-9,.]+$/g.test(event.target.value) ? event.target.value : inputBefore.current
        if (chain.swap.tokenIn && value) {
            const amount = BN(unparse(value, chain.swap.tokenIn.decimals))
            chain.swap.setTokenInAmount(amount.isZero() ? null : amount)
        } else {
            chain.swap.setTokenInAmount(null)
        }

        // Dynamic input

        if (event.target.value === "") return
        if (!/^[0-9,.]+$/g.test(event.target.value)) {
            event.target.value = inputBefore.current
            return
        }

        let insert = 0
        while (event.target.value[insert] === inputBefore.current[insert]) {
            insert ++
            if (!event.target.value[insert] && !inputBefore.current[insert]) break
        }

        if (!event.target.value.endsWith(".")) {
            if (event.target.value.includes(".")) {
                event.target.value = format(event.target.value, event.target.value.length - event.target.value.indexOf(".") - 1)
            } else {
                event.target.value = format(event.target.value, 0)
            }
        }

        if (event.target.value.length === 1) {
            event.target.selectionEnd = 1
        } else {
            let count = 0
            for (let c = 0; c < insert; c ++) {
                if (inputBefore.current[c] === ",") {
                    count ++
                }
            }
            for (let c = 0; c < event.target.value.length; c ++) {
                if (count === insert) {
                    if ((!event.target.value.endsWith(".") && event.target.value[c] === ".") || event.target.value.length < inputBefore.current.length) {
                        event.target.selectionEnd = c
                    } else {
                        event.target.selectionEnd = c + 1
                    }
                    break
                }
                if (event.target.value[c] !== "," && event.target.value[c] !== ".") {
                    count ++
                }
            }
        }
        
        inputBefore.current = event.target.value
    }

    // Update token amount on token change

    useEffect(() => {
        const value = document.getElementById("swap-input").value
        if (chain.swap.tokenIn && value) {
            const amount = BN(unparse(value, chain.swap.tokenIn.decimals))
            chain.swap.setTokenInAmount(amount.isZero() ? null : amount)
        } else {
            chain.swap.setTokenInAmount(null)
        }
    }, [chain.swap.tokenIn])

    // Reset input on chain change

    useEffect(() => {
        chainBefore.current.swap.setTokenInAmount(null)
        chain.swap.setTokenInAmount(null)
        chainBefore.current = chain
        document.getElementById("swap-input").value = ""
    }, [chain])

    // Component

    return (
        <>
            <input id="swap-input" className="input" onChange={handleChange}></input>
            <style jsx>{`
                .input {
                    width: 45%;
                    font-size: 1.2rem;
                    outline: none;
                    border: 2px solid transparent;
                    background-image: linear-gradient(157deg,rgb(48 255 201) 0%,rgb(59 195 243) 33%,rgb(217 51 137) 89%,rgba(217,51,137,1) 100%);
                    background-origin: border-box;
                    box-shadow: inset 0 60px 0 #000;
                    transition: all 0.15s ease-in-out;
                    border-radius : 5px;
                    padding: 8px 12px;
                    margin-right: 5%;
                }

                .input:focus {
                    border: 2px solid transparent;
                    background-image: linear-gradient(157deg,rgb(48 255 201) 0%,rgb(59 195 243) 33%,rgb(217 51 137) 89%,rgba(217,51,137,1) 100%);
                    background-origin: border-box;
                    box-shadow: inset 0 0px 0 #000;
                    color:black;
                    transition: all 0.15s ease-in-out;
                    border-radius : 5px;
                }

                @media only screen and (max-width: 800px), (max-height: 800px) {
                    .input {
                        padding: 7px 9px;
                    }
                }
            `}</style>
        </>
    )
}

// Exports

export default SwapInput