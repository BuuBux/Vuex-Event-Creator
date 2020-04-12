import router from '@/router';

export default class NavigationService {
  public details = 'event-details';

  public filtered = 'event-filtered';

  public list = 'event-list';

  navigateToDetails(eventId: number) {
    router.push({ name: this.details, params: { id: (eventId).toString() } })
      .then((r) => {
        console.log(r);
      });
  }

  showOnlyOrganizerEvents(organizer: string) {
    router.push({ name: this.filtered, params: { organizer } })
      .then((r) => {
        console.log(r);
      });
  }

  goBackToList() {
    router.push({ name: this.list })
      .then((r) => {
        console.log(r);
      });
  }
}
