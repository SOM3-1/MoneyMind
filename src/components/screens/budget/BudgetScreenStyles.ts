import { StyleSheet } from 'react-native';

export const budgetScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  subtext: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
  },
  searchSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    color: '#333',
  },
  sortButton: {
    backgroundColor: '#28a745', // Navigation bar color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piggyBankImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  totalCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  budgetItem: {
    backgroundColor: '#fff',
    padding: 12,
    paddingRight: 15, // extra space to accommodate the icon
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    position: 'relative', // needed for absolute positioning of edit icon
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E4E82',
    fontFamily: 'Montserrat-Regular',
  },
  budgetDate: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  // Edit icon at bottom-right corner of the budget item container
  editIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    position: 'relative',
  },
  cancelIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

