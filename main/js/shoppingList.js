// Main event listener that runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });
    
    // User menu toggle functionality
    document.getElementById('user-menu-button').addEventListener('click', function() {
        const userMenu = document.getElementById('user-menu');
        userMenu.classList.toggle('hidden');
    });
    
    // Add item modal functionality
    const addItemBtn = document.getElementById('add-item-btn');
    const addItemModal = document.getElementById('add-item-modal');
    const closeAddModal = document.getElementById('close-add-modal');
    const cancelAddItem = document.getElementById('cancel-add-item');
    
    // Empty state add item button functionality
    const emptyAddItemBtn = document.getElementById('empty-add-item-btn');
    if(emptyAddItemBtn) {
        emptyAddItemBtn.addEventListener('click', function() {
            addItemModal.classList.remove('hidden');
        });
    }
    
    // Show add item modal
    addItemBtn.addEventListener('click', function() {
        addItemModal.classList.remove('hidden');
    });
    
    // Close add item modal
    closeAddModal.addEventListener('click', function() {
        addItemModal.classList.add('hidden');
    });
    
    // Cancel add item
    cancelAddItem.addEventListener('click', function() {
        addItemModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addItemModal) {
            addItemModal.classList.add('hidden');
        }
    });
    
    // Item checkbox functionality
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.shopping-item');
            const itemId = item.getAttribute('data-item-id');
            const completed = this.checked ? 1 : 0;
            
            // Update item completion status
            if(completed) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
            
            // Create form data
            const formData = new FormData();
            formData.append('update_item', '1');
            formData.append('item_id', itemId);
            formData.append('completed', completed);
            
            // Update item status on server
            fetch('shopping-list.php', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `update_item=1&item_id=${itemId}&completed=${completed}`
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Update the UI
                    if (completed) {
                        item.classList.add('completed');
                    } else {
                        item.classList.remove('completed');
                    }
                    
                    // Update counters
                    updateCounters();
                    
                    // Show success message
                    showToast(
                        completed ? 'Item Completed' : 'Item Uncompleted',
                        completed ? 'Item marked as completed' : 'Item marked as not completed',
                        completed ? 'check-circle' : 'info-circle',
                        completed ? 'text-green-500' : 'text-blue-500'
                    );
                } else {
                    throw new Error(data.message || 'Failed to update item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Revert the checkbox state
                checkbox.checked = !completed;
                // Show error message
                showToast(
                    'Error',
                    error.message || 'Failed to update item status',
                    'exclamation-circle',
                    'text-red-500'
                );
            });
        });
    });
    
    // Delete item functionality
    const deleteButtons = document.querySelectorAll('.delete-item');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if(confirm('Are you sure you want to delete this item?')) {
                const item = this.closest('.shopping-item');
                const itemId = item.getAttribute('data-item-id');
                
                // Delete item from server
                fetch('shopping-list.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `delete_item=1&item_id=${itemId}`
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        item.remove();
                        
                        updateCounters();
                        
                        // Trigger storage event to update dashboard
                        localStorage.setItem('shoppingListUpdated', Date.now());
                        
                        showToast('Item Deleted', 'Item has been removed from your shopping list', 'trash-alt', 'text-red-500');
                        
                        // Remove category section if empty
                        const categorySection = this.closest('.category-section');
                        if(categorySection && categorySection.querySelectorAll('.shopping-item').length === 0) {
                            categorySection.remove();
                        }
                        
                        // Show empty state if no items left
                        if(document.querySelectorAll('.shopping-item').length === 0) {
                            document.getElementById('shopping-list-container').innerHTML = `
                                <div id="empty-state" class="p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-300 bg-opacity-20 mb-4">
                                        <i class="fas fa-shopping-basket text-2xl text-yellow-300"></i>
                                    </div>
                                    <h3 class="text-lg font-medium text-black mb-2">Your shopping list is empty</h3>
                                    <p class="text-text mb-4">Add items to your shopping list to get started</p>
                                    <button id="empty-add-item-btn" class="bg-yellow-300 hover:bg-yellow-400 text-black font-medium py-2 px-4 rounded-lg shadow-sm">
                                        Add Your First Item
                                    </button>
                                </div>
                            `;
                            
                            document.getElementById('empty-add-item-btn').addEventListener('click', function() {
                                addItemModal.classList.remove('hidden');
                            });
                        }
                    } else {
                        console.error('Error deleting item:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    });
    
    // Update item counters
    function updateCounters() {
        const totalItems = document.querySelectorAll('.shopping-item').length;
        const completedItems = document.querySelectorAll('.shopping-item.completed').length;
        const remainingItems = totalItems - completedItems;
        
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('completed-items').textContent = completedItems;
        document.getElementById('remaining-items').textContent = remainingItems;
        document.getElementById('list-stats').textContent = `Showing ${totalItems} items`;
    }
    
    // Toast notification functionality
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    const closeToast = document.getElementById('close-toast');
    
    closeToast.addEventListener('click', function() {
        hideToast();
    });
    
    // Show toast notification
    function showToast(title, message, icon, iconColor) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        toastIcon.innerHTML = `<i class="fas fa-${icon}"></i>`;
        toastIcon.className = `flex-shrink-0 w-6 h-6 mr-3 ${iconColor}`;
        
        toast.classList.remove('translate-x-full');
        toast.classList.add('toast-slide-in');
        
        setTimeout(hideToast, 3000);
    }
    
    // Hide toast notification
    function hideToast() {
        toast.classList.remove('toast-slide-in');
        toast.classList.add('toast-slide-out');
        
        setTimeout(() => {
            toast.classList.remove('toast-slide-out');
            toast.classList.add('translate-x-full');
        }, 300);
    }
});