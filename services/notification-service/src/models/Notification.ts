import mongoose, { Schema } from 'mongoose';
import { INotification } from '../../../../shared/types/dist/index.js';

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['order', 'payment', 'shipping', 'marketing', 'system'], 
    required: true 
  },
  channel: { 
    type: String, 
    enum: ['email', 'sms', 'push', 'in_app'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: { type: Schema.Types.Mixed },
  status: { 
    type: String, 
    enum: ['pending', 'sent', 'delivered', 'failed', 'read'], 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  scheduledAt: { type: Date },
  sentAt: { type: Date },
  readAt: { type: Date },
  metadata: {
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign' },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    templateId: { type: Schema.Types.ObjectId, ref: 'Template' }
  }
}, {
  timestamps: true
});

notificationSchema.index({ userId: 1, status: 1 });
notificationSchema.index({ type: 1, channel: 1 });
notificationSchema.index({ scheduledAt: 1 });
notificationSchema.index({ priority: 1, status: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
