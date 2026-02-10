import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  AI_SUGGESTIONS,
  DECORATION_STYLES,
  EVENT_TYPE_MULTIPLIERS,
  EVENT_TYPES,
  LABOR_COST_PERCENTAGE,
  SERVICES,
  STYLE_MULTIPLIERS,
  VENUE_SIZE_MULTIPLIERS,
  VENUE_SIZES
} from '@/constants/budget-constants';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function BudgetPlannerScreen({ route, navigation }) {
  const params = route?.params || {};
  const [formData, setFormData] = useState({
    eventType: EVENT_TYPES[0],
    decorationStyle: DECORATION_STYLES[0],
    guestCount: '',
    venueSize: VENUE_SIZES[0].value,
  });
  
  const [selectedServices, setSelectedServices] = useState(
    SERVICES.reduce((acc, service) => ({ ...acc, [service.id]: false }), {})
  );
  
  const [plan, setPlan] = useState([]);
  const [budget, setBudget] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [customItem, setCustomItem] = useState({ title: '', price: '' });
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const product = params.product;

  useEffect(() => {
    if (product) setPlan((prev) => [...prev, product]);
  }, [product]);

  // Calculate estimated budget
  const estimatedBudget = useMemo(() => {
    const eventMultiplier = EVENT_TYPE_MULTIPLIERS[formData.eventType] || 1;
    const styleMultiplier = STYLE_MULTIPLIERS[formData.decorationStyle] || 1;
    const sizeMultiplier = VENUE_SIZE_MULTIPLIERS[formData.venueSize] || 1;
    const guestCount = Number(formData.guestCount) || 0;

    // Calculate service costs
    let serviceCost = 0;
    Object.entries(selectedServices).forEach(([serviceId, isSelected]) => {
      if (isSelected) {
        const service = SERVICES.find(s => s.id === serviceId);
        if (service) {
          if (service.id === 'catering') {
            serviceCost += service.basePrice * guestCount;
          } else {
            serviceCost += service.basePrice;
          }
        }
      }
    });

    // Apply multipliers to service cost
    const adjustedServiceCost = serviceCost * eventMultiplier * styleMultiplier * sizeMultiplier;
    
    // Calculate labor cost
    const laborCost = adjustedServiceCost * LABOR_COST_PERCENTAGE;

    // Add custom items
    const customItemsTotal = plan.reduce((sum, item) => sum + Number(item.price), 0);

    return {
      services: adjustedServiceCost,
      labor: laborCost,
      custom: customItemsTotal,
      total: adjustedServiceCost + laborCost + customItemsTotal
    };
  }, [formData, selectedServices, plan]);

  const total = estimatedBudget.total;
  const remaining = budget ? Number(budget) - total : 0;

  // Get AI suggestions based on current selections
  const aiSuggestion = useMemo(() => {
    const suggestions = [];
    
    // Add event-specific suggestion
    if (AI_SUGGESTIONS.eventType[formData.eventType]) {
      suggestions.push(AI_SUGGESTIONS.eventType[formData.eventType]);
    }

    // Add budget-based suggestion
    const budgetLevel = Number(budget) > 100000 ? 'high' : Number(budget) > 50000 ? 'medium' : 'low';
    suggestions.push(AI_SUGGESTIONS.budget[budgetLevel]);

    // Add a random general suggestion
    const randomGeneralSuggestion = AI_SUGGESTIONS.general[Math.floor(Math.random() * AI_SUGGESTIONS.general.length)];
    suggestions.push(randomGeneralSuggestion);

    return suggestions;
  }, [formData.eventType, budget]);

  const handleAddCustomItem = () => {
    if (!customItem.title || !customItem.price) {
      Alert.alert('Error', 'Please enter both item name and price');
      return;
    }

    setPlan(prev => [...prev, { 
      ...customItem, 
      price: Number(customItem.price),
      id: Date.now().toString()
    }]);
    setCustomItem({ title: '', price: '' });
  };

  const handleRemoveItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your plan?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPlan(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    Alert.alert('Share', 'Share plan via email/message');
  };

  const generateBudgetHtml = () => {
    const selectedServiceList = SERVICES.filter(s => selectedServices[s.id]);
    const customItemsRows = plan
      .map(item => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #eee;">${item.title}</td>
          <td style="padding:8px 12px;text-align:right;border:1px solid #eee;">₹${Number(item.price).toFixed(2)}</td>
        </tr>`)
      .join('');

    const servicesRows = selectedServiceList
      .map(service => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #eee;">${service.title}</td>
          <td style="padding:8px 12px;text-align:right;border:1px solid #eee;">₹${service.id === 'catering' ? `${service.basePrice}/guest` : service.basePrice}</td>
        </tr>`)
      .join('');

    return `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Budget Estimate</title>
        </head>
        <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding:16px; color:#111827;">
          <h1 style="font-size:24px; margin-bottom:4px;">DecorNest Budget Estimate</h1>
          <p style="margin:0 0 16px; color:#6b7280;">Generated on ${new Date().toLocaleDateString()}</p>

          <h2 style="font-size:18px; margin:16px 0 8px;">Event Details</h2>
          <table style="border-collapse:collapse; width:100%; max-width:480px;">
            <tr><td style="padding:4px 0;">Event Name</td><td style="padding:4px 0; text-align:right; font-weight:600;">${eventName || '-'}</td></tr>
            <tr><td style="padding:4px 0;">Event Date</td><td style="padding:4px 0; text-align:right; font-weight:600;">${eventDate || '-'}</td></tr>
            <tr><td style="padding:4px 0;">Event Type</td><td style="padding:4px 0; text-align:right; font-weight:600;">${formData.eventType}</td></tr>
            <tr><td style="padding:4px 0;">Decoration Style</td><td style="padding:4px 0; text-align:right; font-weight:600;">${formData.decorationStyle}</td></tr>
            <tr><td style="padding:4px 0;">Guests</td><td style="padding:4px 0; text-align:right; font-weight:600;">${formData.guestCount || '-'}</td></tr>
            <tr><td style="padding:4px 0;">Venue Size</td><td style="padding:4px 0; text-align:right; font-weight:600;">${VENUE_SIZES.find(s => s.value === formData.venueSize)?.label || '-'}</td></tr>
            <tr><td style="padding:4px 0;">Budget</td><td style="padding:4px 0; text-align:right; font-weight:600;">${budget ? `₹${Number(budget).toFixed(2)}` : '-'}</td></tr>
          </table>

          <h2 style="font-size:18px; margin:24px 0 8px;">Selected Services</h2>
          <table style="border-collapse:collapse; width:100%; max-width:480px; border:1px solid #e5e7eb;">
            <thead>
              <tr>
                <th style="padding:8px 12px; text-align:left; background:#f3f4f6; border-bottom:1px solid #e5e7eb;">Service</th>
                <th style="padding:8px 12px; text-align:right; background:#f3f4f6; border-bottom:1px solid #e5e7eb;">Base Price</th>
              </tr>
            </thead>
            <tbody>
              ${servicesRows || '<tr><td colspan="2" style="padding:8px 12px; text-align:center; color:#9ca3af;">No services selected</td></tr>'}
            </tbody>
          </table>

          <h2 style="font-size:18px; margin:24px 0 8px;">Custom Items</h2>
          <table style="border-collapse:collapse; width:100%; max-width:480px; border:1px solid #e5e7eb;">
            <thead>
              <tr>
                <th style="padding:8px 12px; text-align:left; background:#f3f4f6; border-bottom:1px solid #e5e7eb;">Item</th>
                <th style="padding:8px 12px; text-align:right; background:#f3f4f6; border-bottom:1px solid #e5e7eb;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${customItemsRows || '<tr><td colspan="2" style="padding:8px 12px; text-align:center; color:#9ca3af;">No custom items added</td></tr>'}
            </tbody>
          </table>

          <h2 style="font-size:18px; margin:24px 0 8px;">Summary</h2>
          <table style="border-collapse:collapse; width:100%; max-width:480px;">
            <tr><td style="padding:4px 0;">Services Cost</td><td style="padding:4px 0; text-align:right; font-weight:600;">₹${estimatedBudget.services.toFixed(2)}</td></tr>
            <tr><td style="padding:4px 0;">Labor Cost</td><td style="padding:4px 0; text-align:right; font-weight:600;">₹${estimatedBudget.labor.toFixed(2)}</td></tr>
            <tr><td style="padding:4px 0;">Custom Items</td><td style="padding:4px 0; text-align:right; font-weight:600;">₹${estimatedBudget.custom.toFixed(2)}</td></tr>
            <tr><td style="padding:8px 0; font-size:16px;">Total Estimated Cost</td><td style="padding:8px 0; text-align:right; font-size:16px; font-weight:700;">₹${estimatedBudget.total.toFixed(2)}</td></tr>
          </table>
        </body>
      </html>
    `;
  };

  const handleDownloadEstimate = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        Alert.alert('Not available', 'Sharing is not available on this device.');
        return;
      }

      const html = generateBudgetHtml();
      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share budget estimate',
      });
    } catch (error) {
      console.error('Error generating estimate PDF', error);
      const message = error?.message || '';
      if (message.includes('Another share request is being processed')) {
        Alert.alert('Please wait', 'A share dialog is already open. Close it before trying again.');
      } else {
        Alert.alert('Error', 'Could not generate budget estimate. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const parseEventDate = (value) => {
    const [day, month, year] = value.split('/');
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    if (!d || !m || !y) return new Date();
    return new Date(y, m - 1, d);
  };

  const handleOpenDatePicker = () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Date Picker', 'On this device, please type the date manually as DD/MM/YYYY.');
      return;
    }

    const currentDate = eventDate ? parseEventDate(eventDate) : new Date();

    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (event, selectedDate) => {
        if (event.type !== 'set' || !selectedDate) return;
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = selectedDate.getFullYear();
        setEventDate(`${day}/${month}/${year}`);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedText style={styles.heading}>Budget Planner</ThemedText>
          <ThemedText style={styles.subheading}>Plan your perfect event within budget</ThemedText>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <IconSymbol name="square.and.arrow.up.fill" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </LinearGradient>

        {showAiSuggestion && aiSuggestion.length > 0 && (
          <LinearGradient
            colors={['#F5F3FF', '#FAF5FF']}
            style={styles.aiSuggestionContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.aiHeader}>
              <IconSymbol name="sparkles" size={20} color="#8B5CF6" />
              <ThemedText style={styles.aiTitle}>AI Suggestions</ThemedText>
            </View>
            {aiSuggestion.map((suggestion, index) => (
              <View key={index} style={styles.aiSuggestionItem}>
                <IconSymbol name="lightbulb.fill" size={16} color="#C4A1FF" />
                <ThemedText style={styles.aiSuggestion}>{suggestion}</ThemedText>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.dismissButton} 
              onPress={() => setShowAiSuggestion(false)}
            >
              <ThemedText style={styles.dismissText}>Dismiss</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        )}

        <View style={styles.eventDetails}>
          <ThemedText style={styles.sectionTitle}>Event Details</ThemedText>
          
          <View style={styles.inputContainer}>
            <IconSymbol name="calendar.badge.checkmark" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              placeholderTextColor="#999"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          
          <TouchableOpacity style={styles.inputContainer} onPress={handleOpenDatePicker} activeOpacity={0.8}>
            <IconSymbol name="calendar" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="Event Date (DD/MM/YYYY)"
              placeholderTextColor="#999"
              value={eventDate}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <IconSymbol name="indianrupeesign.circle.fill" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="Total Budget"
              placeholderTextColor="#999"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.pickerContainer}>
            <ThemedText style={styles.pickerLabel}>Event Type</ThemedText>
            <SelectList
              setSelected={(value) => setFormData(prev => ({ ...prev, eventType: value }))}
              data={EVENT_TYPES.map(type => ({ key: type, value: type }))}
              save="value"
              placeholder="Select Event Type"
              search={false}
              boxStyles={styles.selectBox}
              dropdownTextStyles={styles.dropdownText}
              inputStyles={styles.selectInput}
              defaultOption={{ key: formData.eventType, value: formData.eventType }}
            />
          </View>

          <View style={styles.pickerContainer}>
            <ThemedText style={styles.pickerLabel}>Decoration Style</ThemedText>
            <SelectList
              setSelected={(value) => setFormData(prev => ({ ...prev, decorationStyle: value }))}
              data={DECORATION_STYLES.map(style => ({ key: style, value: style }))}
              save="value"
              placeholder="Select Decoration Style"
              search={false}
              boxStyles={styles.selectBox}
              dropdownTextStyles={styles.dropdownText}
              inputStyles={styles.selectInput}
              defaultOption={{ key: formData.decorationStyle, value: formData.decorationStyle }}
            />
          </View>

          <View style={styles.inputContainer}>
            <IconSymbol name="person.3.fill" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="Number of Guests"
              placeholderTextColor="#999"
              value={formData.guestCount}
              onChangeText={(value) => setFormData(prev => ({ ...prev, guestCount: value }))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.pickerContainer}>
            <ThemedText style={styles.pickerLabel}>Venue Size</ThemedText>
            <SelectList
              setSelected={(value) => setFormData(prev => ({ ...prev, venueSize: value }))}
              data={VENUE_SIZES.map(size => ({ key: size.value, value: size.label }))}
              save="key"
              placeholder="Select Venue Size"
              search={false}
              boxStyles={styles.selectBox}
              dropdownTextStyles={styles.dropdownText}
              inputStyles={styles.selectInput}
              defaultOption={{ key: formData.venueSize, value: VENUE_SIZES.find(s => s.value === formData.venueSize)?.label }}
            />
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <ThemedText style={styles.sectionTitle}>Select Services</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Choose the services you need for your event</ThemedText>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceItem,
                selectedServices[service.id] && styles.serviceItemSelected
              ]}
              onPress={() => setSelectedServices(prev => ({
                ...prev,
                [service.id]: !prev[service.id]
              }))}
              activeOpacity={0.7}
            >
              <View style={[
                styles.serviceIconCircle,
                selectedServices[service.id] && styles.serviceIconCircleSelected
              ]}>
                <IconSymbol name={service.icon} size={24} color={selectedServices[service.id] ? '#8B5CF6' : '#999'} />
              </View>
              <View style={styles.serviceInfo}>
                <ThemedText style={styles.serviceTitle}>{service.title}</ThemedText>
                <ThemedText style={[styles.servicePrice, selectedServices[service.id] && { color: '#8B5CF6' }]}>
                  ₹{service.id === 'catering' ? `${service.basePrice}/guest` : service.basePrice}
                </ThemedText>
                <ThemedText style={styles.serviceDescription}>{service.description}</ThemedText>
              </View>
              {selectedServices[service.id] && (
                <IconSymbol name="checkmark.circle.fill" size={28} color="#8B5CF6" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summary}>
          <ThemedText style={styles.sectionTitle}>Budget Summary</ThemedText>
          
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Services Cost</ThemedText>
            <ThemedText style={styles.summaryValue}>₹{estimatedBudget.services.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Labor Cost</ThemedText>
            <ThemedText style={styles.summaryValue}>₹{estimatedBudget.labor.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Custom Items</ThemedText>
            <ThemedText style={styles.summaryValue}>₹{estimatedBudget.custom.toFixed(2)}</ThemedText>
          </View>
          
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            style={styles.grandTotal}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ThemedText style={styles.grandTotalLabel}>Total Estimated Cost</ThemedText>
            <ThemedText style={styles.grandTotalValue}>₹{total.toFixed(2)}</ThemedText>
          </LinearGradient>
          
          {budget && (
            <LinearGradient
              colors={remaining >= 0 ? ['#ECFDF5', '#D1FAE5'] : ['#FEE2E2', '#FECACA']}
              style={styles.budgetStatus}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.budgetStatusContent}>
                <IconSymbol 
                  name={remaining >= 0 ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'} 
                  size={24} 
                  color={remaining >= 0 ? '#10B981' : '#EF4444'} 
                />
                <View style={styles.budgetStatusText}>
                  <ThemedText style={styles.budgetStatusLabel}>
                    {remaining >= 0 ? 'Under Budget' : 'Over Budget'}
                  </ThemedText>
                  <ThemedText style={[styles.budgetStatusValue, { color: remaining >= 0 ? '#10B981' : '#EF4444' }]}>
                    ₹{Math.abs(remaining).toFixed(2)}
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          )}
        </View>

        <View style={styles.addItemSection}>
          <ThemedText style={styles.sectionTitle}>Add Custom Item</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Add any additional items to your budget</ThemedText>
          <View style={styles.addItemForm}>
            <TextInput
              style={[styles.input, styles.customItemInput]}
              placeholder="Item Name"
              placeholderTextColor="#999"
              value={customItem.title}
              onChangeText={text => setCustomItem(prev => ({ ...prev, title: text }))}
            />
            <TextInput
              style={[styles.input, styles.customItemPriceInput]}
              placeholder="Price"
              placeholderTextColor="#999"
              value={customItem.price}
              onChangeText={text => setCustomItem(prev => ({ ...prev, price: text }))}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButtonWrapper} onPress={handleAddCustomItem} activeOpacity={0.8}>
              <LinearGradient
                colors={['#E6E0FF', '#FFD6E0']}
                style={styles.addButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol name="plus.circle.fill" size={28} color="#8B5CF6" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemsList}>
          <ThemedText style={styles.sectionTitle}>Budget Items ({plan.length})</ThemedText>
          {plan.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="tray.fill" size={48} color="#C4A1FF" />
              <ThemedText style={styles.emptyStateText}>No custom items added yet</ThemedText>
            </View>
          ) : (
            plan.map((item) => (
              <View key={item.id || item.title} style={styles.item}>
                <View style={styles.itemIconCircle}>
                  <IconSymbol name="tag.fill" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.itemInfo}>
                  <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.itemPrice}>₹{Number(item.price).toFixed(2)}</ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.id)}
                  style={styles.removeButton}
                  activeOpacity={0.7}
                >
                  <IconSymbol name="trash.fill" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.downloadButtonWrapper} 
            onPress={handleDownloadEstimate}
            activeOpacity={0.8}
            disabled={isDownloading}
          >
            <View style={styles.downloadButton}>
              <IconSymbol name="arrow.down.doc.fill" size={20} color="#8B5CF6" />
              <ThemedText style={styles.downloadButtonText}>Download</ThemedText>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.vendorButtonWrapper}
            onPress={() => navigation.navigate('VendorDashboard')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.vendorButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="person.2.fill" size={20} color="#2D1B69" />
              <ThemedText style={styles.vendorButtonText}>Find Vendors</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // AI Suggestions
  aiSuggestionContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 2,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  aiSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  aiSuggestion: {
    fontSize: 13,
    color: '#2D1B69',
    flex: 1,
    lineHeight: 18,
  },
  dismissButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E6E0FF',
    borderRadius: 12,
  },
  dismissText: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Event Details
  eventDetails: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    fontSize: 15,
    color: '#2D1B69',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 8,
  },
  selectBox: {
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  selectInput: {
    color: '#2D1B69',
    fontSize: 15,
  },
  dropdownText: {
    color: '#2D1B69',
    fontSize: 14,
  },
  
  // Services
  servicesContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  serviceItemSelected: {
    backgroundColor: '#F5F3FF',
    borderColor: '#8B5CF6',
    borderWidth: 2,
  },
  serviceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceIconCircleSelected: {
    backgroundColor: '#E6E0FF',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  
  // Summary
  summary: {
    margin: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 4,
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
  },
  budgetStatus: {
    padding: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  budgetStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  budgetStatusText: {
    flex: 1,
  },
  budgetStatusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  budgetStatusValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  
  // Add Item Section
  addItemSection: {
    margin: 16,
  },
  addItemForm: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  customItemInput: {
    flex: 2,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  customItemPriceInput: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  addButtonWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  // Items List
  itemsList: {
    margin: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  
  // Bottom Buttons
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
  },
  downloadButtonWrapper: {
    flex: 1,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  downloadButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  vendorButtonWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  vendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  vendorButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D1B69',
  },
  bottomPadding: {
    height: 32,
  },
});
