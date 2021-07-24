import React from 'react'

const Statistics = ({good, neutral, bad}) => {
    let allRatingCount = good + neutral + bad;
    if (allRatingCount === 0) {
        return (
        <div>
            <h1>Statistics</h1>
            <p>No feedback given!</p>
        </div>
        )
    }
    else {
        return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tr>
                    <td>Good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>Neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>Bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>All</td>
                    <td>{allRatingCount}</td>
                </tr>
                <tr>
                    <td>Average</td>
                    <td>{(good - bad) / allRatingCount}</td>
                </tr>
                <tr>
                    <td>Positive</td>
                    <td>{((good) / allRatingCount)*100}%</td>
                </tr>
            </table>
        </div>
        )
    }
}

export default Statistics