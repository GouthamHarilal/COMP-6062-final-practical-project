const app = Vue.createApp({
  data() {
    
    return {
        studentFullName : 'Goutham Harilal',
        user: {
            firstName: '',
            lastName: '',
            age: '',
            avatar: ''
        },

        city: 'London',
        province: 'Ontario',
        country: 'Canada',
        weather:{
            temperature:'',
            wind:'',
            description:'',

        },
        
        dictionary:{
            word : '',
            pronounciation: '',
            meaning:'',
            
        },

        
    };
  },

    created() {
        this.getRandomUser();
    },
    computed: {
        fullname() {
        return this.user.firstName + ' ' + this.user.lastName;
    }
    },

    methods: {
        getRandomUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-data')
            .then(response => response.json())
            .then(data => {

                    this.user.firstName = data.user_profile.first_name;
                    this.user.lastName = data.user_profile.last_name;
                    this.user.age = data.user_profile.age;
                    this.user.avatar = data.user_profile.avatar_url;
            })
            .catch(error => console.log(error));   
        },

        getWeather() {
            fetch(`https://comp6062.liamstewart.ca/weather-data?city=${this.city}&province=${this.province}&country=${this.country}`)
            .then(response => response.json())
            .then(data => {
                    
                    this.weather.temperature = data.weather_data.temperature;
                    this.weather.wind = data.weather_data.wind_speed
                    this.weather.description = data.weather_data.weather_description
            })
            .catch(error => console.log(error));
            
        },

        defineWord() {
            fetch(`https://comp6062.liamstewart.ca/api/define?word=${this.word}`)
            .then(response => response.json())
            .then(data => {
                    
               
                    this.dictionary.word = data.word,
                    this.dictionary.pronounciation= data.phonetic,
                    this.dictionary.meaning= data.definition
                
            })
            .catch(error => console.log(error));
        }
    },
})
app.mount('#app');
