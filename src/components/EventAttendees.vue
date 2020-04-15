<template>
  <div class="attendees-field">
    {{title}}
    <ul class="options">
      <li
        class="option-element"
        @click="addAttendee(user)"
        :key="user.id"
        v-for="user in filterByUsing(registered)"> {{user.name}} </li>
    </ul>
    <div v-if="attendees.length !== 0" class="">
      <ul>
        <li :key="user.id" v-for="user in attendees">
            {{user.name}} <span v-html="icons.trash" @click="removeAttendee(user)" />
        </li>
      </ul>
    </div>
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
  @import '../styles/variables';
  .attendees-field {
    max-width: 280px;
    margin: 25px auto 0 auto;
    .options {
      list-style: none;
      margin-top: 15px;
      height: 140px;
      overflow: auto;
      border: 1px solid rgba($jet, 0.3);
      .option-element {
        text-align: left;
        padding: 8px 15px;
        font: 400 14px/1.4 'Ubuntu', sans-serif;
        &:hover {
          background: $marigold;
        }
      }
    }
  }
</style>
