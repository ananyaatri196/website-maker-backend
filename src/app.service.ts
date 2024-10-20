import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

@Injectable()
export class AppService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.openai = new OpenAIApi(configuration);
  }

  // A simple HTML generator based on user input
  async generateWebsite(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: 'gpt-3.5-turbo',  // Switch to GPT-3.5 turbo model
        prompt: `Generate a basic HTML and CSS website template based on the following description: ${prompt}`,
        max_tokens: 1000, // Control the length of the response
        temperature: 0.7, // Control creativity
      });
      return response.data.choices[0].text.trim(); // Return generated HTML/CSS
    }
    catch (error) {
      // console.error('Error generating template:', error);
      // return '<p>Error generating the template</p>';
      if (error.response) {
        console.error('API Error:', error.response.data); // Logs error details from OpenAI
      } else {
        console.error('Other Error:', error.message); // Logs network or other errors
      }
      return '<p>Error generating the template. Please try again later.</p>';
    }
  }
}
