<template>
  <form @submit.prevent="createNewEvent" class="event-create-view">
    <h2 class="page-header">Set up your event</h2>
    <div class="about-event">
      <h3 class="section-header"> About event </h3>
      <event-input
        v-model="event.title"
        @blur="$v.event.title.$touch()"
        title="Event title"
        type="text" />
      <event-textarea
        @blur="$v.event.description.$touch()"
        v-model="event.description"
        title="Event description" />
    </div>
    <div class="event-time-location">
      <h3 class="section-header"> Event location & time</h3>
      <event-input
        @blur="$v.event.location.$touch()"
        v-model="event.location"
        title="Event location"
        type="text" />
      <div class="date-wrapper">
        <date-picker
          valueType="MMM DD YYYY"
          @blur="$v.event.date.$touch()"
          v-model="event.date" />
        <event-select
          @blur="$v.event.time.$touch()"
          size="small"
          title="Set time"
          selected="selected"
          disabled="disabled"
          v-model="event.time"
          :options="times" />
      </div>
    </div>
    <div class="event-categories">
      <h3 class="section-header"> How would you categorize you event </h3>
      <event-select
        size="full"
        title="Set event category"
        selected="selected"
        disabled="disabled"
        @blur="$v.event.category.$touch()"
        v-model="event.category"
        :options="categories" />
    </div>
    <div class="invite-friends">
      <h3 class="section-header"> Make your event even bigger with friends </h3>
      <event-attendees
        v-model="event.attendees"
        title="Add users to event"/>
    </div>
    <transition-group class="error-box" appear name="errors" tag="div">
      <template v-if="$v.event.title.$error">
        <p :key="1" v-if="!$v.event.title.required"> Title is required </p>
        <p :key="2" v-if="!$v.event.title.minLength"> Title is too short </p>
      </template>
      <template v-if="$v.event.description.$error">
        <p :key="3" v-if="!$v.event.description.required"> Description is required </p>
        <p :key="4" v-if="!$v.event.description.minLength"> Description is too short </p>
      </template>
      <template v-if="$v.event.location.$error">
        <p :key="5" v-if="!$v.event.location.required"> Location of event is required </p>
      </template>
      <template v-if="$v.event.category.$error">
        <p :key="6" v-if="!$v.event.category.required"> Category is required </p>
      </template>
      <template v-if="$v.event.time.$error">
        <p :key="7" v-if="!$v.event.time.required"> You need to set time of event </p>
      </template>
      <template v-if="$v.event.date.$error">
        <p :key="8" v-if="!$v.event.date.required"> Date is not set, please fill it up </p>
      </template>
    </transition-group>
    <button :disabled="$v.$anyError" class="add-new-event-btn">
      Add new event
    </button>
    <p class="error-summary" v-if="$v.$anyError"> Please fill out the required fields(s). </p>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Event } from '@/types/EventTyping';
import { Action, State } from 'vuex-class';
import DatePicker from 'vue2-datepicker';
import EventInput from '@/components/EventInput.vue';
import EventTextarea from '@/components/EventTextarea.vue';
import EventSelect from '@/components/EventSelect.vue';
import { User } from '@/types/UserTyping';
import EventAttendees from '@/components/EventAttendees.vue';
import { Validations } from 'vuelidate-property-decorators';
import { required, minLength } from 'vuelidate/lib/validators';
import NProgress from 'nprogress';

const namespace = {
  event: 'event',
  user: 'user',
};

@Component({
  components: {
    EventAttendees,
    EventInput,
    EventTextarea,
    EventSelect,
    DatePicker,
  },
})
export default class EventCreate extends Vue {
  @Action('createEvent', { namespace: namespace.event }) createEvent;

  @State('user', { namespace: namespace.user }) user: User;

  @State('categories') categories: string[];

  public times: string[] = [];

  public event: Event = {
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    category: '',
    description: '',
    attendees: [],
  };

  @Validations()
  validations = {
    event: {
      title: { required, minLength: minLength(4) },
      date: { required },
      time: { required },
      location: { required },
      category: { required },
      description: { required, minLength: minLength(40) },
    },
  }

  createFreshEventObject() {
    console.log(this);
    return {
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      category: '',
      description: '',
      attendees: [],
    };
  }

  async createNewEvent() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      NProgress.start();
      try {
        const event = await this.createEvent(this.event);
        await this.$router.push({
          name: 'event-details',
          params: { id: (event.id).toString() },
        });
        this.event = this.createFreshEventObject();
      } catch (error) {
        NProgress.done();
        console.log('There was problem with creating your event');
      }
    }
  }

  mounted() {
    this.event.organizer = this.user.name;
    for (let i = 0; i < 24; i += 1) {
      // TODO Find a way to use shorthand if statment with no-unused-expressions turn on
      if (i < 10) {
        this.times.push(`0${i}:00`);
      } else {
        this.times.push(`${i}:00`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vue2-datepicker/index.css';
  @import '../styles/mixins';
  .event-create-view {
    max-width: 768px;
    width: 100%;
    margin: 0 auto 120px auto;
    @extend %card-shadow-radius;
    background: #fff;
    padding: 35px;
  }
  .add-new-event-btn {
    margin-top: 35px;
    @extend %button-events;
    &[disabled] {
      background-color: #F1F1F1;
      color: #444;
      border-color: #444;
      &:hover {
        &:before {
          display: none;
        }
      }
    }
  }
  .page-header {
    text-align: center;
    font: 700 24px/1.5 'Ubuntu', sans-serif;
    color: $flame;
  }
  .section-header {
    text-align: left;
    font: 700 18px/1.35 'Ubuntu', sans-serif;
    margin: 0 0 15px 0;
  }
  .date-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    max-width: 385px;
    width: 100%;
    margin: 0 auto 25px auto;
  }
  .error-box {
    position: fixed;
    right: 35px;
    top: 35px;
    max-width: 255px;
    width: 100%;
    p {
      text-align: left;
      border-radius: 6px;
      box-shadow: 4px 4px 8px 3px rgba(0, 0, 0, 0.12);
      background: $flame;
      color: #fff;
      padding: 8px 25px;
      font: 700 14px/1.5 'Ubuntu', sans-serif;
      margin: 0 0 15px 0;
    }
  }
  .errors-enter {
    transform: translateX(-35px) scale(0.35);
  }
  .errors-enter-active,
  .errors-leave-active {
    transition: transform 0.25s ease-in-out;
  }
  .errors-leave-to {
    transform: translateX(35px) scale(0.35);
  }
  .error-summary {
    color: $flame;
    margin-top: 15px;
    font: 700 14px/1.35 'Ubuntu', sans-serif;
  }
</style>
