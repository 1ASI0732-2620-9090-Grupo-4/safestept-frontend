import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { UserAdminStore } from '../../../application/user-admin-store';
import { IdentityAccessStore } from '../../../application/identity-access-store';

const AVAILABLE_ROLES = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_INSTRUCTOR'] as const;

@Component({
  selector: 'app-user-roles-form',
  templateUrl: './user-roles-form.html',
  styleUrls: ['./user-roles-form.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    TranslateModule,
  ],
})
export class UserRolesForm implements OnInit {
  protected readonly availableRoles = AVAILABLE_ROLES;

  protected readonly userId = signal<number | null>(null);
  protected readonly selectedRoles = signal<string[]>([]);
  private seeded = false;

  protected readonly targetUser = computed(() => {
    const id = this.userId();
    return id !== null ? this.store.getUserById(id) : undefined;
  });

  protected readonly isEditingSelf = computed(
    () => this.userId() !== null && this.userId() === this.identityAccessStore.authenticatedUser()?.id,
  );

  constructor(
    public store: UserAdminStore,
    private identityAccessStore: IdentityAccessStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    effect(() => {
      const user = this.targetUser();
      if (user && !this.seeded) {
        this.selectedRoles.set([...user.roles]);
        this.seeded = true;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.userId.set(id ? Number(id) : null);
    });
  }

  protected roleLabelKey(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN': return 'admin.users.roleAdmin';
      case 'ROLE_INSTRUCTOR': return 'admin.users.roleInstructor';
      default: return 'admin.users.roleUser';
    }
  }

  protected isSelected(role: string): boolean {
    return this.selectedRoles().includes(role);
  }

  protected isDisabled(role: string): boolean {
    return role === 'ROLE_ADMIN' && this.isEditingSelf();
  }

  protected toggle(role: string, checked: boolean): void {
    if (this.isDisabled(role)) return;
    this.selectedRoles.update((roles) =>
      checked ? [...new Set([...roles, role])] : roles.filter((r) => r !== role),
    );
  }

  protected save(): void {
    const id = this.userId();
    if (id === null) return;
    this.store.updateUserRoles(id, this.selectedRoles());
    this.router.navigate(['/app/users']);
  }
}
