<script>
export default {
  name: "footerbar",

  data: () => ({
    links: ["About Us", "Contact Us"],
    dialog: false,
    feedbackType: "",
    feedbackText: "",
    email: "",
    items: ["Observation", "Bug Report", "Feature Request"],
    userName: "",
    user: "",
  }),
  methods: {},
};
</script>

<template>
  <v-footer color="lighten-1" padless>
    <v-container fluid padles>
      <v-row justify="center">
        <v-spacer />
        <v-col>
          <v-btn color="white" text rounded>About Us </v-btn>
        </v-col>
        <v-spacer />
        <v-col>
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ props }">
              <v-btn color="white" text rounded v-bind="props"
                >Feedback
                <v-icon size="medium" icon="mdi-comment-outline"></v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Feedback Form</span>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="12" v-if="!userName">
                      <v-text-field
                        label="Email*"
                        required
                        v-model="email"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        :items="items"
                        v-model="feedbackType"
                        label="Feedback Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea required v-model="feedbackText"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue-darken-1" text @click="saveFeedback()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-footer>
</template>
