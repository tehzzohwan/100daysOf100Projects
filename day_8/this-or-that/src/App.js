import React, { Component } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCUrTgvYDVHGfkFtPVatE4Cnmvs6ybCEBA',
  authDomain: 'this-or-that-dogs.firebaseapp.com',
  databaseURL: 'https://this-or-that-dogs.firebaseio.com',
  projectId: 'this-or-that-dogs',
  storageBucket: '',
  messagingSenderId: '214191822750',
  appId: '1:214191822750:web:fa6973b15e240941eb288f'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class App extends Component {
	state = {
		dogs: [],
		database: undefined,
		idx1: undefined,
		idx2: undefined
	};

	componentDidMount() {
    this.loadDataAndRandomDogs();
    setTimeout(() => {
      this.getRandomDogs();
    }, 2000);
  }

  loadDataAndRandomDogs = () => {
    const dogsRef = ref(database, 'dogs');
    onValue(dogsRef, (snapshot) => {
      const dogs = snapshot.val() || {};
      const dogsArray = Object.values(dogs);
      this.setState({ dogs: dogsArray });
    });
  };

  favoriteDog = (id) => {
    const { dogs } = this.state;
    const dog = dogs.find((d) => d.id === id);

    if (dog) {
      const dogRef = ref(database, `dogs/${id}`);
      update(dogRef, { likes: dog.likes + 1 });
      this.getRandomDogs();
    }
  };

  getRandomDogs = () => {
    const { dogs } = this.state;

    if (dogs.length >= 2) {
      const idx1 = Math.floor(Math.random() * dogs.length);
      let idx2;
      do {
        idx2 = Math.floor(Math.random() * dogs.length);
      } while (idx2 === idx1);

      this.setState({ idx1, idx2 });
    }
  };

  getMedal = (idx) => {
    switch (idx) {
      case 0:
        return (
          <p className='place place-1'>
            <i className='fas fa-medal'></i>
          </p>
        );
      case 1:
        return (
          <p className='place place-2'>
            <i className='fas fa-medal'></i>
          </p>
        );
      case 2:
        return (
          <p className='place place-3'>
            <i className='fas fa-medal'></i>
          </p>
        );
      default:
        return <p className='place'>{idx + 1}</p>;
    }
  };

	render() {
		const { dogs, idx1, idx2 } = this.state;
		const dog1 = dogs[idx1];
		const dog2 = dogs[idx2];

		if (dogs.length === 0 || !idx1 || !idx2) return <h1>Loading data...</h1>;

		return (
			<div className='main'>
				<h1 className='text-center'>Which one is your favorite?</h1>
				<div className='container text-center'>
					<div className='img-container'>
						<img src={dog1.image} alt='' />
						<h3 className='name'>{dog1.name}</h3>
						<button
							className='choose-btn'
							onClick={() => this.favoriteDog(dog1.id)}>
							This!
						</button>
					</div>
					<h3 className='or'>OR</h3>
					<div className='img-container'>
						<img src={dog2.image} alt='' />
						<h3 className='name'>{dog2.name}</h3>
						<button
							className='choose-btn'
							onClick={() => this.favoriteDog(dog2.id)}>
							That!
						</button>
					</div>
				</div>
				<h2>Leaderboard - Top 10</h2>
				<table class='leaderboard'>
					<tbody>
						{dogs
							.sort((a, b) => b.likes - a.likes)
							.slice(0, 10)
							.map((dog, idx) => (
								<tr key={dog.id}>
									<td>{this.getMedal(idx)}</td>
									<td>
										<img src={dog.image} alt={dog.id} />
									</td>
									<td className='name'>{dog.name}</td>
									<td>{dog.likes}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;