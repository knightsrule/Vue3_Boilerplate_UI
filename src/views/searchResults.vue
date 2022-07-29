<script>
import { API } from "aws-amplify";

const apiName = "";
const apiPath = "";

export default {
  name: "SearchResults",
  data: () => ({
    keyWords: "",
    recordings: [],
    browserName: "",
    userAgent: "",
  }),

  mounted: function () {
    //console.log("in mounted", this.$route.query);
    this.keyWords = this.$route.query.words;
    this.doSearch();
  },
  updated: function () {
    //console.log("in updated event", this.$route.query);
    this.keyWords = this.$route.query.words;
    this.doSearch();
  },
  methods: {
    doSearch: function () {
      console.log("in doSearch: ");

      /* 

      const myInit = {
        headers: {},
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
          words: this.keyWords,
          userName: this.userName,
        },
      };

        // call this to get the data 
      API.get(apiName, apiPath, myInit)
        .then((response) => {
          //save the search results
          //console.log(response);
        })
        .catch((error) => {
          console.log("error in API Get", error);
        });
        */
    },
  },
};
</script>

<template>
  <v-container fluid>
    <h3>Search results for : {{ this.keyWords }}</h3>
  </v-container>
</template>
