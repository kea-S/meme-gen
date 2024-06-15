import React, { useState, useEffect } from 'react'

export const Meme = () => {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([]);

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(previousMeme => {
            return {
                ...previousMeme,
                [name]: value
            }
        });
    }

    function getMemeImage() {
        const allMemeImagesData = allMemes;
        const randomNumber = Math.floor(Math.random() * allMemeImagesData.length)
        const randomMeme = allMemeImagesData[randomNumber];
        setMeme(previousMeme => {
            return {
                ...previousMeme,
                randomImage: randomMeme.url
            }
        });
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(json => setAllMemes(json.data.memes));
    }, []);

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name='topText'
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name='bottomText'
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                    name='memeImage'
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className='meme'>
                <img src={meme.randomImage} className='meme--image' />
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme;