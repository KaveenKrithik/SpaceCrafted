import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick'; 
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Recommendations.css';


const genAI = new GoogleGenerativeAI("AIzaSyAZC8FPXW4fbfSv_N65uFCiFh8JiaakKcI"); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

function Recommendations() {
  const location = useLocation();
  const { dimensions, preferences } = location.state || {};
  const [recommendations, setRecommendations] = useState([]);

  
  const fetchRecommendations = async () => {
    const prompt = `
      Provide personalized interior design recommendations for a room with the following details:
      - Dimensions: ${dimensions}
      - User Preferences: ${preferences}

      Suggest creative design ideas, themes, and color palettes. Include specific elements and styles that would suit the given dimensions and preferences.
    
    `;

    try {
      const result = await model.generateContent(prompt);
      const generatedText = await result.response.text(); 

      
      const ideas = generatedText.split('\n').filter((idea) => idea.trim() !== '');
      setRecommendations(ideas);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations(['Failed to retrieve recommendations. Please check your API key or try again later.']);
    }
  };

  
  useEffect(() => {
    if (dimensions && preferences) {
      fetchRecommendations();
    }
  }, [dimensions, preferences]);

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'ease-in-out',
  };

  return (
    <div className="recommendations-container">
      <h2>Your Personalized Recommendations</h2>

      {recommendations.length > 0 ? (
        <Slider {...settings} className="carousel">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation">
              <p>{rec}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
}

export default Recommendations;


