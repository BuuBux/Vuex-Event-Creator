<template>
  <div class="attendees-field">
    <template v-if="filterByUsing(registered).length !== 0">
      <h4 class="subtitle-attendees"> {{title}} </h4>
      <transition-group
        mode="out-in"
        name="slide-people"
        v-if="filterByUsing(registered).length !== 0"
        class="options"
        tag="ul"
        appear>
        <li
          class="option-element"
          @click="addAttendee(user)"
          :key="user.id"
          v-for="user in filterByUsing(registered)"> {{user.name}} </li>
      </transition-group>
    </template>
    <template v-if="attendees.length !== 0">
      <h4 class="subtitle-attendees"> Invited people </h4>
      <transition-group
        mode="out-in"
        name="slide-people"
        class="attendees"
        tag="ul"
        appear>
        <li :key="user.id" v-for="user in attendees">
          {{user.name}}
          <span class="remove-attendee"
                v-html="icons.trash"
                @click="removeAttendee(user)" />
        </li>
      </transition-group>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { User } from '@/types/UserTyping';
import icons from '@/helpers/icons';
import { SvgIcons } from '@/types/IconsTyping';

const namespace = 'user';

@Component
export default class EventAttendees extends Vue {
  @Prop(String) title: string;

  @State('user', { namespace }) user: User;

  @State('registeredUsers', { namespace }) registeredUsers: User[];

  public icons: SvgIcons = icons;

  public registered: User[] = [];

  public attendees: User[] = [];

  public filterByUsing(users: User[]) {
    return users.filter((user: User) => user.id !== this.user.id);
  }

  public addAttendee(user: User) {
    this.attendees.push(user);
    this.registered = this.registered.filter(
      (registeredUser: User) => registeredUser.id !== user.id,
    );
    this.$emit('input', this.attendees);
  }

  public removeAttendee(user: User) {
    this.attendees = this.attendees.filter((attendee: User) => attendee.id !== user.id);
    this.registered.push(user);
  }

  public mounted() {
    this.registered = this.registeredUsers;
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  .slide-people-enter {
    transform: scale(0.75) translateX(-10px);
    opacity: 0;
  }
  .slide-people-enter-active,
  .slide-people-leave-active {
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }
  .slide-people-leave-to {
    opacity: 0;
    transform: scale(0.75) translateX(10px);
  }
  .slide-people-move {
    transform: translateY(10px);
  }
  .attendees-field {
    max-width: 385px;
    margin: 25px auto;
    .subtitle-attendees {
      font: 400 18px/1.45 'Ubuntu', sans-serif;
      margin: 0 0 15px 0;
      &:after {
        content: '';
        display: block;
        max-width: 175px;
        height: 2px;
        margin: 10px auto 0 auto;
        background-image: radial-gradient( circle, $flame 55%, #fff 75% );
      }
    }
    .options {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 15px 0;
      .option-element {
        flex: 0 0 25%;
        max-width: 25%;
        min-height: 96.25px;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        font: 700 14px/1.4 'Ubuntu', sans-serif;
        transition:
          background 0.2s ease-in-out,
          color 0.2s ease-in-out,
          box-shadow 0.2s ease-in-out;
        &:hover {
          cursor: pointer;
          color: #fff;
          background: $marigold;
          box-shadow: 4px 4px 8px 3px rgba(0, 0, 0, 0.12);
        }
      }
    }
    .remove-attendee {
      @include base-icon-styling(25px);
    }
    .attendees {
      list-style: none;
      li {
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        box-shadow: 2px 2px 4px 3px rgba(0,0,0,0.07);
        border-radius: 6px;
        padding: 4px 8px;
        margin: 0 0 10px 0;
        border: 1px solid #ddd;
      }
    }
  }
</style>

<style lang="scss">
  @import '../styles/variables';
  .remove-attendee {
    padding: 1px;
    &:hover {
      cursor: pointer;
    }
    path {
      fill: $flame;
    }
  }
</style>
