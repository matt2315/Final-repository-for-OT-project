var logIn = new Vue
(
  {
    el: "#loginVue",
    data:
    {
      username: null,
      password: null,
      message: 'hehe'
    },
    methods:
    {
        logIn: function ()
        {
          axios.get('/api/logIn',
          {
              params:
              {
                username: this.username,
                password: this.password
              }
          })
          .then(response => {
            if(response.data == "Logged In")
            {
              window.location = "purchasingTix.html"
            }
            else{
              this.message = response.data;
            }

          });

      },
      signUp: function()
      {
        if (this.username && this.password)
        {
          axios.post('/api/signUp',
          {
              username: this.username,
              password: this.password
          })
          .then(response => {this.message = response.data})
        }
      }
    }
  }
)

var purchaseTix = new Vue
(
  {
    el: "#purchaseVue",
    data:
    {
      movieTitle: null,
      silipQuantity: null,
      TuyongLumpiaQuantity: null,
      GinataangManiQuantity:null,
      message1: "try",
      ticket_template: null,
      t_id: localStorage.getItem('tid'),
      t_mTitle: localStorage.getItem('mTitle'),
      t_tQuantity: localStorage.getItem('tQuantity'),
      t_tPrice: localStorage.getItem('tPrice'),
      t_tDatePurchased: localStorage.getItem('tDatePurchased'),
      showcart: false,
      showcart2: false,
      testMessage: null,
      u_qty:null,
      u_title: null,
      o_id: null,
      hdate: null,
      hsale: null,
      hquantity: null,
      historymade: 'empty',
      showcart3: false,
      history_list: null
    },
    methods:
    {
      addSilipToCart: function()
      {
        axios.post('/api/purchaseTix',
      {
        movieTitle: "Silip",
        silipQuantity: this.silipQuantity,
      })
        .then(response => {this.message1 = response.data;})
        setTimeout(location.reload.bind(location), 250);
      },

      addTuyongLumpiaToCart: function()
      {
        axios.post('/api/purchaseTix2',
      {
        movieTitle: "Tuyong Lumpia",
        TuyongLumpiaQuantity: this.TuyongLumpiaQuantity
      })
      .then(response => {this.message1 = response.data;})
        setTimeout(location.reload.bind(location), 250);
      },

      addGinataangManiToCart: function()
      {
        axios.post('/api/purchaseTix3',
      {
        movieTitle: "Ginataang Mani",
        GinataangManiQuantity: this.GinataangManiQuantity
      })
      .then(response => {this.message1 = response.data;})
        setTimeout(location.reload.bind(location), 250);
      },
      refresh: function()
      {
      axios.get('/api/cart')
      .then(response => {this.ticket_template = response.data;});
      },
      viewcart: function()
      {
        this.showcart = true
      },
      updatecart3: function()
      {
        this.showcart3 = true
        axios.get('/api/gethistory')
        .then(response => {this.history_list = response.data})
      },
      update: function(key)
      {
        this.showcart = true
        axios.get('/api/update_qty',
        {params: {
          id: key
        }})
        .then(response =>
          {
          this.u_qty = response['data']['qty'];
          this.u_title = response['data']['title'];
          })
      },
      cancelupdate: function()
      {
        this.showcart = false;
        this.showcart2 = false;
        this.showcart3 =false;
      },
      updateTicket: function()
      {
        axios.get('/api/update_Ticket',
      {
        params:
        {
            u_qty: this.u_qty,
            u_title: this.u_title
        }

      })
      .then (response => {this.testMessage = response.data})
      alert("Ticket Updated")
      setTimeout(location.reload.bind(location), 250);
    },
    deleteTicket: function()
    {
      axios.get('/api/delete_ticket',
      {
          u_title: this.u_title
      })
      .then (response => {this.testMessage = response.data})
      alert("Ticket Deleted")
      setTimeout(location.reload.bind(location), 250);
    },
    purchase: function()
    {
      this.showcart2 = true
      axios.get('/api/purchaseNow')
      .then(response => {this.testMessage = response.data});
    },
    toTheHistory: function()
    {
      axios.post('/api/toHistory',
    {
      hdate: this.hdate,
      hsale: this.hsale,
      hquantity: this.hquantity
    })
      .then(response => {this.historymade = response.data})
      setTimeout(location.reload.bind(location), 250);
    },
    logOut: function()
    {
      axios.get('/api/loggingOut')
      .then(response => {this.historymade = response.data})
      alert("Logging Out");
      window.location = "../";
      setTimeout(location.reload.bind(location), 500);
    }
    }
  }
)
