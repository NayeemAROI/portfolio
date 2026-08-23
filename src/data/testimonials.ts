export interface Testimonial {
  id: string;
  quote: string;
  project: string;
  rating: number;
  date?: string;
  tags?: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    quote: "Email test task done successfully. Good work. Thanks a lot for the help Nayeemur!",
    project: "Cold email test",
    rating: 5.0,
    tags: ["Email Deliverability", "Cold Outreach", "Quality"],
  },
  {
    id: "review-2",
    quote: "I liked to work with Nayeemur on this test task. Happy to try a bit bigger task. Thank you for your help, Thomas",
    project: "Cold outreach specialist - huge audience",
    rating: 5.0,
    tags: ["Lead Generation", "Communication", "Outreach"],
  },
  {
    id: "review-3",
    quote: "Nayeemur was thorough and communicates at a high level! Would recommend to others!",
    project: "Outbound Leads",
    rating: 5.0,
    tags: ["Clear Communication", "B2B Leads", "Professionalism"],
  },
  {
    id: "review-4",
    quote: "He was extremely knowledgeable and completed all of my requirements successfully. I am very pleased!",
    project: "WordPress expert (Elementor)",
    rating: 5.0,
    tags: ["WordPress", "Elementor", "Committed to Quality"],
  },
  {
    id: "review-5",
    quote: "Great work, very fast freelancer. Highly recommend!",
    project: "HTML to WordPress",
    rating: 5.0,
    tags: ["Web Development", "Fast Turnaround"],
  },
  {
    id: "review-6",
    quote: "I had a wonderful experience with Nayeem, he is very responsive and was able to deliver quality work. I will hire him again!",
    project: "WordPress developer",
    rating: 5.0,
    tags: ["Responsiveness", "WordPress", "Quality Work"],
  },
  {
    id: "review-7",
    quote: "I got work very soon. He is honest and dedicated person also.",
    project: "WordPress installation",
    rating: 5.0,
    tags: ["Honesty", "Fast Execution", "WordPress Setup"],
  },
];
