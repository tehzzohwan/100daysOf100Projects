const authorsEl = document.querySelectorAll('.author');
const container = document.querySelector('.testimonials-container');
const nameEl = document.querySelector('.name');
const textEl = document.querySelector('.text');

const testimonials = [{
	text: `I had my concerns that due to a tight deadline this project can\'t be done. 
            But Bobby proved me wrong not only he delivered an outstanding work but he 
            managed to deliver 1 day prior to the deadline. 
            And when I asked for some revisions he made them in MINUTES. 
            I\'m looking forward to work with him again and I totally recommend him. Thanks again Florin!`,
	name: 'Tolu Anifowose',
	color: 'rgba(235, 59, 90,1.0)'
},{
	text: `Second time hiring him. Finished everything in a timely manner and his work is excellent. 
           Can\'t recommend him enough.`,
	name: 'Phoebe Williams',
	color: 'rgba(250, 130, 49,1.0)'
},{
	text: `Bobby Enomate never fails to impress me by the quality of his work and delivering on time. 
           When it comes to front-end, he is definitely my go to guy. Always is a pleasure to work with 
           Alexandru even when deadlines are tight and pressure is great. 
           It\'s reassuring to have a project in such good hands.`,
	name: 'Wattson N. Emmanuel',
	color: 'rgba(75, 123, 236,1.0)'
},{
	text: `Bobby has been of great help on our different web projects. 
           He is very trustworthy and serious in the work done. Keep on the 
           good work and energy, been a pleasure to collaborate.`,
	name: 'Augustine Emoghene',
	color: 'rgba(165, 94, 234,1.0)'
},{
	text: `I hired Bobby based on others positive experiences, and I understand why he\'s so highly rated.
           His code is very clean, he communicates well, and he likes to offer alternative solutions.`,
	name: 'Dre Agboola',
	color: 'rgba(32, 191, 107,1.0)'
}];

addTestimonial(0);

authorsEl.forEach((author, idx) => {
	author.addEventListener('mouseover', (e) => {
		addTestimonial(idx);
		author.classList.add('selected');
	})
});

function addTestimonial(idx) {
	const testimonial = testimonials[idx];
	
	nameEl.innerHTML = testimonial.name;
	textEl.innerHTML = testimonial.text;
	container.style.background = testimonial.color;
	container.style.boxShadow = `0 35px 10px -20px ${testimonial.color.substring(0, testimonial.color.length-4)}0.9)`;
	
	authorsEl.forEach(author => {
		author.classList.remove('selected');
	});
}
