import { createStore } from "vuex";

export default createStore({
  strict: true,
  state: {
    posts: [    {
      "post_id": 1,
      "author_name": "Alex",
      "date": "Oct 22, 2022",
      "body": "Anyone knows in which room is the lab today?", 
      "num_likes": 10,
      "photo" : " "
    },
    {
      "post_id": 2,
      "author_name": "Marina",
      "date": "Oct 24, 2022",
      "body": "Have you ever opened the timetable?", 
      "num_likes": 1,
      "photo" : " "
    },
    {
      "post_id": 3,
      "author_name": "Alex",
      "date": "Oct 24, 2022",
      "body": "No, I haven't by the way check out the photo I have taken",
      "photo": "https://d1bvpoagx8hqbg.cloudfront.net/originals/experience-tartu-estonia-gerri-a827caecbc6b0a51c8b12cd324047423.jpg",
      "num_likes": 12
    },
    {
      "post_id": 4,
      "author_name": "Marina",
      "date": "Oct 25, 2022",
      "body": "Well that's nice! By the way I have a picture of my favourite building - Delta",
      "photo": "https://pbs.twimg.com/media/En5n60oXMAYVi5-.jpg", 
      "num_likes": 0
    },
    {
      "post_id": 5,
      "author_name": "Oliver",
      "date": "Dec 12, 2022",
      "body": "Hey, I am new here what is going on?",
      "num_likes": 29,
      "photo" : " "
    },
    {
      "post_id": 6,
      "author_name": "Evelyn",
      "date": "Dec 15, 2022",
      "body": "You are in the best chat group ever!", 
      "num_likes": 2,
      "photo" : " "
    },
    {
      "post_id": 7,
      "author_name": "Clay",
      "date": "Dec 16, 2022",
      "body": "Welcome bro! Hope you will enjoy Tartu and have a pleasent semester!",
      "photo": "https://pbs.twimg.com/media/DsOkyuzXcAASUkM.jpg", 
      "num_likes": 16
    },
    {
      "post_id": 8,
      "author_name": "Marina",
      "date": "Dec 16, 2022",
      "body": "This picture is better :)",
      "photo": "https://www.kyoto-u.ac.jp/static/en/news_data/h/h1/news7/2008/images/081219_3/01.jpg", 
      "num_likes": 8
    },
    {
      "post_id": 9,
      "author_name": "Lina",
      "date": "Dec 17, 2022",
      "body": "Aahahahaha the photos are fire! Wish I was in Tartu now", 
      "num_likes": 13,
      "photo" : " "
    },
    {
      "post_id": 10,
      "author_name": "Alex",
      "date": "January 21, 2022",
      "body": "Has anybody found the timetable for a new semester?", 
      "num_likes": 55,
      "photo" : " "
    }]
  },
  getters: {
    postsget: state => {
    var postsget = state.posts.map(post => {
                 return {
                  post_id: post.post_id,
                  author_name: post.author_name,
                  date: post.date,
                  body: post.body, 
                  num_likes: post.num_likes,
                  photo: post.photo
                 }
             });
             return postsget
            },
          

    
            },

  mutations: {
    addlike:  (state, {post_id}) => {
     state.posts.filter(post => post.post_id==post_id).map(post=>post.num_likes+=1)
      // state.posts.forEach(post => {
      //     post.num_likes += 1;
      // })     
    },
    zero: state => {
      state.posts.forEach(post => {
        post.num_likes = 0;
    })
              },
  },
  
  actions: {
    
  },
  modules: {},
});


