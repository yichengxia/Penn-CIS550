import React from "react";

const ReviewVote = ({ usefulCount, funnyCount, coolCount }) => {
  return (
    <div className="rev-vote-container">
      <div className="rev-vote">
        Useful <span className="rev-vote-count">{usefulCount}</span>
      </div>

      <div className="rev-vote">
        Funny <span className="rev-vote-count">{funnyCount}</span>
      </div>

      <div className="rev-vote">
        Cool <span className="rev-vote-count">{coolCount}</span>
      </div>
    </div>
  );
};

export default ReviewVote;
