import React, { useEffect, useState } from 'react';
const Text = () => {
    var work = ["fighting", "learning", "qwerty"];
    let i = 0;
    useEffect(() => {
        const interval = setInterval(() => {
            if (i < work.length) {
                console.log(work[i])
                ++i
            }
            else {
                console.log("out")
                clearInterval(interval)
            }



        }, 3000);

        
    }, []);

    return (
        <div>
            {/* <h1>{work[seconds]}</h1> */}
        </div>
    );
}

export default Text;