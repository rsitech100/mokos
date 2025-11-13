// components/ReviewForm/StarRating.tsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface StarRatingProps {
      initialRating?: number;
      onRatingChange: (rating: number) => void;
      size?: number;
      color?: {
            filled: string;
            unfilled: string;
      };
}

export function StarRating({
      initialRating = 0,
      onRatingChange,
      size = 28,
      color = {
            filled: "#FFAB0D",
            unfilled: "#E0E0E0"
      }
}: StarRatingProps) {
      const [rating, setRating] = useState(initialRating);
      const [hover, setHover] = useState(0);

      const handleRatingChange = (currentRating: number) => {
            setRating(currentRating);
            onRatingChange(currentRating);
      };

      return (
            <div className="flex flex-row gap-[5px]">
                  {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                              <label key={index}>
                                    <input
                                          type="radio"
                                          name="rating"
                                          value={currentRating}
                                          onClick={() => handleRatingChange(currentRating)}
                                          className="hidden"
                                    />
                                    <FaStar
                                          size={size}
                                          color={
                                                currentRating <= (hover || rating)
                                                      ? color.filled
                                                      : color.unfilled
                                          }
                                          onMouseEnter={() => setHover(currentRating)}
                                          onMouseLeave={() => setHover(0)}
                                          className="cursor-pointer transition-colors duration-200"
                                    />
                              </label>
                        );
                  })}
            </div>
      );
}