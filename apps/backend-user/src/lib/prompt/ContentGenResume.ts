export const ContentGenPromptResume = (userInfo: JSON, jobDescription: string) => `provided you with the json object of the user create the ats friendly resume for the user according to this job description ${jobDescription} follow the points given below while creating resume.
Use a clean format: Stick to simple fonts (Arial, Calibri) and avoid tables, columns, or graphics.
Standard headings: Use common section titles like "Work Experience," "Education," "Skills" — no creative names.
Match keywords: Pick important skills and keywords from the job description and include them naturally.
Reverse chronological order: List your latest job first and go backward.
Achievements > Responsibilities: Focus on results — "Improved API performance by 20%" sounds stronger than "Worked on APIs."
No fancy designs: Skip images, logos, or fancy borders
Proofread: Spelling mistakes might confuse the ATS and cost you key matches.
Add numbers: while writing project description or while writing experience section then at every point add numbers or percent.
Bullet points: write short consice and on point bullet points
json object for user details is: ${userInfo}
`;
