<template>
  <div class="attendees-field">
    {{title}}
    <ul class="options">
      <li
        @click="addAttendee(user)"
        :key="index"
        v-for="(user, index) in filterByUsing(registered)"> {{user.name}} </li>
    </ul>
    {{ attendees }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { User } from '@/types/UserTyping';

const namespace = 'user';

@Component
export default class EventAttendees extends Vue {
  @Prop(String) title: string;

  @State('user', { namespace }) user: User;

  @State('registeredUsers', { namespace }) registeredUsers: User[];

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
  }

  public removeAttendee(user: User) {
    this.attendees = this.attendees.filter((attendee: User) => attendee.id !== user.id);
  }

  public mounted() {
    this.registered = this.registeredUsers;
  }
}
</script>

<style lang="scss" scoped>

</style>
