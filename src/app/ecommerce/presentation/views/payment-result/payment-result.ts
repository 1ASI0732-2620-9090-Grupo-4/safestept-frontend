import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../../application/ecommerce-store';

@Component({
  selector: 'app-payment-result',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(EcommerceStore);
  protected readonly status = computed(() => this.route.snapshot.data['status'] as 'success' | 'cancel');
  protected readonly isSuccess = computed(() => this.status() === 'success');

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!orderId) {
      this.store.refreshOrders();
      return;
    }

    if (this.isSuccess() && sessionId) {
      this.store.confirmStripePayment(orderId, sessionId);
      return;
    }

    if (!this.isSuccess()) {
      this.store.cancelStripePayment(orderId, sessionId);
    }
  }
}

