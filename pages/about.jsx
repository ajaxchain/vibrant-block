// About page

const About = () => (
    <>
        <div className="content">
            <h1 className="title">About Vibrant Block</h1>
            <p className="paragraph">VibrantBlock is a decentralised, open-source, energy-efficient public blockchain with high speed and low transaction fees.</p>
            <p className="paragraph">VibrantBlock is designed to support the creator economy with Web3 applications such as DeFi and GameFi, ultimately serving as the foundational infrastructure for an open metaverse. VibrantBlock is designed to serve the next billion Web3 users and to help them experience the full promise of self-custody of their digital assets. </p>
            <p className="paragraph">VibrantBlock is the leading Ethereum-compatible layer 1 blockchain network built on the Cosmos SDK that supports the Inter-Blockchain Communication (IBC) protocol.
 vibrantblock.network 
</p>
        </div>
        <style jsx>{`
            .content {
                width: 100%;
                height: calc(100vh - 140px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0 calc(50% - 300px) 20px calc(50% - 300px);
            }

            .title {
                font-size: 2rem;
                margin-bottom: 32px;
            }

            .paragraph {
                font-size: 1.1rem;
                margin-bottom: 16px;
            }

            .attribution {
                color: var(--gray);
                font-size: 0.9rem;
                white-space: pre;
                margin-bottom: 4px;
            }

            .first {
                margin-top: 16px;
            }

            .link {
                color: inherit;
                text-decoration: underline;
            }

            @media only screen and (max-width: 1000px), (max-height: 900px) {
                .content {
                    height: calc(100vh - 100px);
                }
            }

            @media only screen and (max-width: 550px) {
                .content {
                    padding-bottom: 0;
                }
                
                .title {
                    margin-bottom: 24px;
                }

                .paragraph {
                    margin-bottom: 12px;
                }

                .first { 
                    margin-top: 12px;
                }
            }
        `}</style>
    </>
)

// Exports

export async function getStaticProps() {
    return {
        props: {
            page: "About"
        }
    }
}

export default About